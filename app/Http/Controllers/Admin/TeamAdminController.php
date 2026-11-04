<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\TimeOff;
use App\Support\Str;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;

/** Team module: therapists, skills, shifts, time off (A06). */
class TeamAdminController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $weekStart = CarbonImmutable::parse($request->get('week', CarbonImmutable::today($tenant->default_timezone)->startOfWeek()->toDateString()), $tenant->default_timezone);

        $staff = Staff::query()
            ->with(['skills:id,name', 'shifts' => fn ($q) => $q
                ->whereBetween('starts_at', [$weekStart, $weekStart->addDays(7)])])
            ->withCount(['skills'])
            ->orderBy('sort')
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'name' => $s->display_name,
                'initials' => $s->initials(),
                'hue' => Str::hue($s->display_name),
                'gender' => $s->gender,
                'level' => $s->level,
                'specialty' => $s->specialty,
                'active' => $s->active,
                'skills' => $s->skills->pluck('name')->values()->all(),
                'shifts' => $s->shifts->map(fn ($sh) => [
                    'id' => $sh->id,
                    'day' => $sh->starts_at->timezone($tenant->default_timezone)->toDateString(),
                    'start' => $sh->starts_at->timezone($tenant->default_timezone)->format('H:i'),
                    'end' => $sh->ends_at->timezone($tenant->default_timezone)->format('H:i'),
                ])->values()->all(),
            ]);

        $timeOff = TimeOff::query()
            ->with('staff:id,display_name')
            ->where('period', '&&', sprintf('[%s,%s)', $weekStart->toIso8601String(), $weekStart->addDays(14)->toIso8601String()))
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'staff' => $t->staff->display_name,
                'from' => $t->period->start->timezone($tenant->default_timezone)->format('D j M H:i'),
                'to' => $t->period->end->timezone($tenant->default_timezone)->format('D j M H:i'),
                'reason' => $t->reason,
            ]);

        return inertia('Admin/Team', [
            'staff' => $staff,
            'time_off' => $timeOff,
            'week' => $weekStart->toDateString(),
            'locations' => \App\Models\Location::query()->orderBy('name')->get(['id', 'name']),
            'services' => $tenant->services()->active()->get(['id', 'name']),
        ]);
    }

    public function storeStaff(Request $request)
    {
        $data = $this->validateStaff($request);

        $staff = Staff::create($data + ['sort' => 90]);
        $staff->skills()->sync($data['skill_ids'] ?? []);
        \Illuminate\Support\Facades\DB::table('staff_skills')->where('staff_id', $staff->id)->update(['tenant_id' => $staff->tenant_id]);

        return back()->with('success', 'Therapist added.');
    }

    public function updateStaff(Request $request, Staff $staff)
    {
        $data = $this->validateStaff($request, forUpdate: true);
        $staff->update($data);
        if (array_key_exists('skill_ids', $data)) {
            $staff->skills()->sync($data['skill_ids']);
            \Illuminate\Support\Facades\DB::table('staff_skills')->where('staff_id', $staff->id)->update(['tenant_id' => $staff->tenant_id]);
        }

        return back()->with('success', 'Therapist saved.');
    }

    protected function validateStaff(Request $request, bool $forUpdate = false): array
    {
        $rules = [
            'display_name' => ($forUpdate ? 'sometimes' : 'required').'|string|max:80',
            'gender' => ($forUpdate ? 'sometimes' : 'required').'|in:female,male',
            'level' => 'sometimes|in:junior,senior,master',
            'specialty' => 'sometimes|nullable|string|max:30',
            'active' => 'sometimes|boolean',
            'skill_ids' => 'sometimes|array',
        ];

        return $request->validate($rules);
    }

    public function storeShift(Request $request)
    {
        $data = $request->validate([
            'staff_id' => 'required|uuid',
            'location_id' => 'required|uuid',
            'day' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i',
        ]);

        $tenant = $this->ctx->check();
        $tz = $tenant->default_timezone;

        $startsAt = CarbonImmutable::parse($data['day'].' '.$data['start'], $tz)->timezone('UTC');
        $endsAt = CarbonImmutable::parse($data['day'].' '.$data['end'], $tz)->timezone('UTC');
        if ($endsAt->lte($startsAt)) {
            $endsAt = $endsAt->addDay(); // closing shift past midnight
        }

        Shift::create([
            'staff_id' => $data['staff_id'],
            'location_id' => $data['location_id'],
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
        ]);

        return back()->with('success', 'Shift added.');
    }

    public function destroyShift(Shift $shift)
    {
        $shift->delete();

        return back()->with('success', 'Shift removed.');
    }

    public function storeTimeOff(Request $request)
    {
        $data = $request->validate([
            'staff_id' => 'required|uuid',
            'from' => 'required|date_format:Y-m-d H:i',
            'to' => 'required|date_format:Y-m-d H:i',
            'reason' => 'nullable|string|max:120',
        ]);

        $tenant = $this->ctx->check();
        $tz = $tenant->default_timezone;

        TimeOff::create([
            'staff_id' => $data['staff_id'],
            'period' => sprintf('[%s,%s)',
                CarbonImmutable::parse($data['from'], $tz)->timezone('UTC')->toIso8601String(),
                CarbonImmutable::parse($data['to'], $tz)->timezone('UTC')->toIso8601String()),
            'reason' => $data['reason'] ?? 'Time off',
        ]);

        return back()->with('success', 'Time off recorded.');
    }
}
