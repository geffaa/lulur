<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Room;
use App\Models\Shift;
use App\Models\Staff;
use App\Support\Money;
use App\Support\TenantContext;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/** A04 — utilisation, revenue, no-show, rebooking, tips (F12). Numbers must match the seeder. */
class ReportsController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $tz = $tenant->default_timezone;
        $today = CarbonImmutable::today($tz);
        $from = CarbonImmutable::parse($request->get('from', $today->subDays(29)->toDateString()), $tz)->startOfDay();
        $to = CarbonImmutable::parse($request->get('to', $today->toDateString()), $tz)->endOfDay();

        return inertia('Admin/Reports', [
            'range' => ['from' => $from->toDateString(), 'to' => $to->toDateString()],
            'kpi' => $this->kpis($from, $to),
            'utilisation' => $this->utilisation($from, $to),
            'heatmap' => $this->roomHeatmap($from, $to),
            'revenue_by_service' => $this->revenueByService($from, $to),
            'tips' => $this->tips($from, $to),
            'no_shows' => $this->noShows($from, $to),
            'currency' => $tenant->currency,
        ]);
    }

    protected function kpis($from, $to): array
    {
        $revenue = (int) Payment::query()
            ->whereBetween('paid_at', [$from, $to])
            ->whereIn('kind', ['deposit', 'balance', 'tip', 'package'])
            ->where('status', 'succeeded')
            ->sum('amount');

        $completed = Booking::query()->whereBetween('completed_at', [$from, $to])->count();
        $noShows = Booking::query()->where('status', 'no_show')->whereBetween('created_at', [$from, $to])->count();
        $totalFinished = $completed + $noShows;

        // rebooking: clients who came back within 90 days of a completed visit
        $rebooked = DB::selectOne(<<<'SQL'
            SELECT count(DISTINCT a.client_id)::int AS n
            FROM bookings a
            JOIN bookings b
              ON b.client_id = a.client_id
             AND b.completed_at > a.completed_at
             AND b.completed_at <= a.completed_at + interval '90 days'
            WHERE a.tenant_id = ? AND a.status = 'completed'
              AND a.completed_at BETWEEN ? AND ?
        SQL, [$this->ctx->id(), $from, $to])->n ?? 0;

        $tips = (int) Payment::query()->whereBetween('paid_at', [$from, $to])->where('kind', 'tip')->where('status', 'succeeded')->sum('amount');

        return [
            'revenue' => $revenue,
            'completed' => $completed,
            'no_show_rate' => $totalFinished > 0 ? round($noShows / $totalFinished * 100) : 0,
            'no_shows' => $noShows,
            'rebooking_rate' => $completed > 0 ? round($rebooked / $completed * 100) : 0,
            'tips_total' => $tips,
        ];
    }

    /** Booked minutes vs shift minutes per therapist. */
    protected function utilisation($from, $to): array
    {
        $staff = Staff::orderBy('sort')->get();

        $booked = DB::selectOne(<<<'SQL'
            SELECT json_object_agg(staff_id, mins) AS data
            FROM (
                SELECT br.staff_id, SUM(EXTRACT(EPOCH FROM (LEAST(br.ends_at, ?) - GREATEST(br.starts_at, ?)))/60)::int AS mins
                FROM booking_resources br
                JOIN bookings b ON b.id = (SELECT booking_id FROM booking_items bi WHERE bi.id = br.booking_item_id)
                WHERE br.staff_id IS NOT NULL AND br.status = 'active'
                  AND br.starts_at < ? AND br.ends_at > ?
                  AND b.status IN ('completed','in_service','checked_in','confirmed')
                  AND b.tenant_id = ?
                GROUP BY br.staff_id
            ) t
        SQL, [$to, $from, $to, $from, $this->ctx->id()])->data;

        $shifts = DB::selectOne(<<<'SQL'
            SELECT json_object_agg(staff_id, mins) AS data
            FROM (
                SELECT staff_id, SUM(EXTRACT(EPOCH FROM (LEAST(ends_at, ?) - GREATEST(starts_at, ?)))/60)::int AS mins
                FROM shifts
                WHERE starts_at < ? AND ends_at > ? AND tenant_id = ?
                GROUP BY staff_id
            ) t
        SQL, [$to, $from, $to, $from, $this->ctx->id()])->data;

        $booked = json_decode((string) $booked, true) ?? [];
        $shifts = json_decode((string) $shifts, true) ?? [];

        return $staff->map(fn ($s) => [
            'id' => $s->id,
            'name' => $s->display_name,
            'level' => $s->level,
            'specialty' => $s->specialty,
            'booked_min' => (int) ($booked[$s->id] ?? 0),
            'shift_min' => (int) ($shifts[$s->id] ?? 0),
        ])->values()->all();
    }

    /** Room × hour booking counts for the rosewood heat map. */
    protected function roomHeatmap($from, $to): array
    {
        $tenant = $this->ctx->check();
        $rooms = Room::query()->whereHas('location', fn ($q) => $q->where('tenant_id', $tenant->id))->orderBy('sort')->get();

        $rows = DB::select(<<<'SQL'
            SELECT r.id AS room_id, r.name AS room,
                   EXTRACT(HOUR FROM bi.starts_at AT TIME ZONE tz)::int AS hour,
                   COUNT(*)::int AS n
            FROM booking_items bi
            JOIN bookings b ON b.id = bi.booking_id
            JOIN locations l ON l.id = b.location_id
            JOIN rooms r ON r.id = (SELECT room_id FROM booking_resources br WHERE br.booking_item_id = bi.id AND br.room_id IS NOT NULL LIMIT 1)
            CROSS JOIN LATERAL (SELECT l.timezone AS tz) t
            WHERE b.tenant_id = ? AND b.status IN ('completed','in_service','checked_in','confirmed','no_show')
              AND bi.starts_at >= ? AND bi.starts_at < ?
            GROUP BY r.id, r.name, hour, tz
            ORDER BY r.sort, hour
        SQL, [$this->ctx->id(), $from, $to]);

        $lookup = [];
        foreach ($rows as $r) {
            $lookup[$r->room_id.'|'.(int) $r->hour] = (int) $r->n;
        }
        $hours = range(9, 20);

        return $rooms->map(fn ($room) => [
            'id' => $room->id,
            'name' => $room->name,
            'room_type' => $room->room_type,
            'cells' => collect($hours)->map(fn ($h) => $lookup[$room->id.'|'.$h] ?? 0),
        ])->values()->all();
    }

    protected function revenueByService($from, $to): array
    {
        $rows = DB::select(<<<'SQL'
            SELECT s.name AS service, COUNT(*)::int AS bookings, SUM(bi.price)::bigint AS revenue
            FROM booking_items bi
            JOIN bookings b ON b.id = bi.booking_id
            JOIN services s ON s.id = bi.service_id
            WHERE b.tenant_id = ? AND b.status = 'completed'
              AND b.completed_at BETWEEN ? AND ?
            GROUP BY s.name
            ORDER BY revenue DESC
        SQL, [$this->ctx->id(), $from, $to]);

        return collect($rows)->map(fn ($r) => [
            'service' => $r->service,
            'bookings' => $r->bookings,
            'revenue' => (int) $r->revenue,
        ])->all();
    }

    protected function tips($from, $to): array
    {
        $rows = DB::select(<<<'SQL'
            SELECT st.display_name, COUNT(*)::int AS n, SUM(t.amount)::bigint AS amount
            FROM tips t
            JOIN staff st ON st.id = t.staff_id
            JOIN payments p ON p.id = t.payment_id
            WHERE t.tenant_id = ? AND p.status = 'succeeded' AND p.paid_at BETWEEN ? AND ?
            GROUP BY st.display_name
            ORDER BY amount DESC
        SQL, [$this->ctx->id(), $from, $to]);

        return collect($rows)->map(fn ($r) => ['staff' => $r->display_name, 'count' => $r->n, 'amount' => (int) $r->amount])->all();
    }

    protected function noShows($from, $to): array
    {
        return Booking::query()
            ->where('status', 'no_show')
            ->whereBetween('created_at', [$from, $to])
            ->with(['client:id,name', 'items.service:id,name', 'items:id,booking_id,service_id,starts_at'])
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(fn ($b) => [
                'client' => $b->client?->name ?? 'Walk-in',
                'service' => $b->items->first()?->service?->name,
                'when' => $b->items->first()?->starts_at?->timezone($this->ctx->check()->default_timezone)->format('D j M, H:i'),
                'fee' => (int) $b->payments()->where('kind', 'no_show_fee')->where('status', 'succeeded')->sum('amount'),
            ])->all();
    }
}
