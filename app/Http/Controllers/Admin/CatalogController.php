<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\Form;
use App\Models\FormVersion;
use App\Models\Package;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceVariant;
use App\Models\Staff;
use App\Support\Money;
use App\Support\TenantContext;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/** Catalog module: services + variants + addons, packages, forms (IA §2). */
class CatalogController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();
        $tab = $request->get('tab', 'services');
        $currency = $tenant->currency;

        $services = Service::query()
            ->with(['category:id,name', 'variants', 'addons', 'form:id,name'])
            ->withCount(['skilledStaff'])
            ->orderBy('sort')
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'category' => $s->category?->name,
                'description' => $s->description,
                'photo' => $s->photo,
                'badge' => $s->badge,
                'active' => $s->active,
                'bookable_online' => $s->bookable_online,
                'room_type' => $s->room_type,
                'therapists_needed' => $s->therapists_needed,
                'for_two' => $s->max_guests > 1,
                'buffer' => $s->buffer_min,
                'form' => $s->form?->name,
                'variants' => $s->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'duration' => $v->duration_min,
                    'price' => $v->price,
                    'by_level' => $v->price_by_level,
                ]),
                'addons' => $s->addons->map(fn ($a) => ['id' => $a->id, 'name' => $a->name]),
                'skills_count' => $s->skilled_staff_count,
            ]);

        $packages = Package::query()->with('service:id,name')->get()->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'service' => $p->service->name,
            'sessions' => $p->sessions_count,
            'price' => $p->price,
            'valid_months' => $p->valid_months,
            'discount' => $p->discount_percent,
            'active' => $p->active,
        ]);

        $forms = Form::query()->withCount('versions')->with('activeVersion')->get()->map(fn ($f) => [
            'id' => $f->id,
            'name' => $f->name,
            'kind' => $f->kind,
            'version' => $f->activeVersion?->version,
            'published' => $f->activeVersion?->published_at?->format('j M Y'),
            'services' => $f->services()->count(),
        ]);

        return inertia('Admin/Catalog', [
            'tab' => $tab,
            'services' => $services,
            'packages' => $packages,
            'forms' => $forms,
            'currency' => $currency,
        ]);
    }

    /** A03 — service editor (create). */
    public function create(Request $request)
    {
        return inertia('Admin/ServiceEdit', [
            'service' => null,
            ...$this->editorOptions(),
        ]);
    }

    /** A03 — service editor. */
    public function edit(Request $request, Service $service)
    {
        $service->load(['variants', 'addons', 'category', 'form']);

        return inertia('Admin/ServiceEdit', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'description' => $service->description,
                'category_id' => $service->category_id,
                'photo' => $service->photo,
                'badge' => $service->badge,
                'room_type' => $service->room_type,
                'therapists_needed' => $service->therapists_needed,
                'max_guests' => $service->max_guests,
                'price_basis' => $service->price_basis,
                'buffer' => $service->buffer_min,
                'form_id' => $service->requires_form_id,
                'active' => $service->active,
                'bookable_online' => $service->bookable_online,
                'variants' => $service->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'duration' => $v->duration_min,
                    'price' => $v->price,
                    'master_surcharge' => $v->price_by_level['master'] ?? 0,
                    'senior_surcharge' => $v->price_by_level['senior'] ?? 0,
                ]),
                'addon_ids' => $service->addons->pluck('id')->all(),
                'skill_ids' => $service->skilledStaff()->pluck('staff.id')->all(),
            ],
            ...$this->editorOptions(),
        ]);
    }

    protected function editorOptions(): array
    {
        $tenant = $this->ctx->check();

        return [
            'categories' => ServiceCategory::orderBy('sort')->get(['id', 'name']),
            'forms' => Form::get(['id', 'name']),
            'addons' => Addon::where('active', true)->get(['id', 'name', 'duration_min', 'price']),
            'staff' => Staff::where('active', true)->orderBy('sort')->get(['id', 'display_name', 'level', 'gender']),
            'currency' => $tenant->currency,
        ];
    }

    public function storeService(Request $request)
    {
        $data = $this->validateService($request);
        $tenant = $this->ctx->check();

        $service = DB::transaction(function () use ($data, $tenant) {
            $service = Service::create($this->serviceColumns($data) + [
                'tenant_id' => $tenant->id,
                'slug' => \Illuminate\Support\Str::slug($data['name']),
                'category_id' => $data['category_id'],
                'sort' => 90,
            ]);
            $this->syncRelations($service, $data);

            return $service;
        });

        return redirect()->route('admin.catalog.services.edit', $service)->with('success', 'Service created.');
    }

    public function updateService(Request $request, Service $service)
    {
        $data = $this->validateService($request);

        DB::transaction(function () use ($service, $data) {
            $service->update($this->serviceColumns($data) + ['category_id' => $data['category_id']]);
            $this->syncRelations($service, $data);
        });

        return redirect()->route('admin.catalog.services.edit', $service)->with('success', 'Service saved.');
    }

    protected function validateService(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:120',
            'description' => 'nullable|string|max:1000',
            'category_id' => 'required|uuid',
            'photo' => 'nullable|string|max:200',
            'badge' => 'nullable|in:signature',
            'room_type' => 'required|in:single,couples,facial,wet,any',
            'therapists_needed' => 'required|integer|min:1|max:2',
            'max_guests' => 'required|integer|min:1|max:2',
            'price_basis' => 'required|in:per_guest,per_booking',
            'buffer' => 'required|integer|min:0|max:60',
            'form_id' => 'nullable|uuid',
            'active' => 'boolean',
            'bookable_online' => 'boolean',
            'variants' => 'required|array|min:1',
            'variants.*.duration' => 'required|integer|min:15|max:360',
            'variants.*.price' => 'required|integer|min:0',
            'variants.*.master_surcharge' => 'nullable|integer|min:0',
            'variants.*.senior_surcharge' => 'nullable|integer|min:0',
            'addon_ids' => 'array',
            'skill_ids' => 'array',
        ]);
    }

    protected function serviceColumns(array $data): array
    {
        return [
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'photo' => $data['photo'] ?? null,
            'badge' => $data['badge'] ?? null,
            'room_type' => $data['room_type'],
            'therapists_needed' => $data['therapists_needed'],
            'max_guests' => $data['max_guests'],
            'price_basis' => $data['price_basis'],
            'buffer_min' => $data['buffer'],
            'requires_form_id' => $data['form_id'] ?? null,
            'active' => $data['active'] ?? true,
            'bookable_online' => $data['bookable_online'] ?? true,
        ];
    }

    protected function syncRelations(Service $service, array $data): void
    {
        $service->variants()->delete();
        foreach ($data['variants'] as $i => $v) {
            ServiceVariant::create([
                'tenant_id' => $service->tenant_id,
                'service_id' => $service->id,
                'duration_min' => $v['duration'],
                'price' => $v['price'],
                'price_by_level' => array_filter([
                    'master' => $v['master_surcharge'] ?? 0,
                    'senior' => $v['senior_surcharge'] ?? 0,
                ]),
                'sort' => $i,
            ]);
        }

        $service->addons()->sync($data['addon_ids'] ?? []);
        // staff_skills carries tenant_id for RLS; sync() against the full staff set (inactive staff included)
        $service->belongsToMany(\App\Models\Staff::class, 'staff_skills', 'service_id', 'staff_id')
            ->withPivot('tenant_id')
            ->sync(collect($data['skill_ids'] ?? [])->mapWithKeys(fn ($id) => [$id => ['tenant_id' => $service->tenant_id]])->all());
    }

    public function storePackage(Request $request)
    {
        $tenant = $this->ctx->check();
        $data = $request->validate([
            'service_id' => 'required|uuid',
            'name' => 'required|string|max:120',
            'sessions_count' => 'required|integer|min:2|max:50',
            'price' => 'required|integer|min:0',
            'valid_months' => 'required|integer|min:1|max:36',
            'discount_percent' => 'nullable|integer|min:0|max:90',
        ]);

        Package::create($data + ['tenant_id' => $tenant->id]);

        return back()->with('success', 'Package created.');
    }

    /** Publish a new form version (fields jsonb, version++). */
    public function updateForm(Request $request, Form $form)
    {
        $data = $request->validate([
            'fields' => 'required|array',
            'consent_text' => 'nullable|string|max:2000',
        ]);

        $latest = $form->latestVersion();

        $version = FormVersion::create([
            'tenant_id' => $form->tenant_id,
            'form_id' => $form->id,
            'version' => ($latest?->version ?? 0) + 1,
            'fields' => $data['fields'],
            'consent_text' => $data['consent_text'] ?? $latest?->consent_text,
            'published_at' => now(),
        ]);

        $form->update(['active_version_id' => $version->id]);

        return back()->with('success', "Form v{$version->version} published. Bookings now require the new version.");
    }
}
