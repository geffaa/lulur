<?php

namespace Database\Seeders;

use App\Enums\BookingStatus;
use App\Models\Addon;
use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\BookingItemAddon;
use App\Models\BookingResource;
use App\Models\Client;
use App\Models\Form;
use App\Models\FormVersion;
use App\Models\GiftCard;
use App\Models\Location;
use App\Models\Membership;
use App\Models\Package;
use App\Models\ClientPackage;
use App\Models\PackageRedemption;
use App\Models\Payment;
use App\Models\Room;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceVariant;
use App\Models\Shift;
use App\Models\Staff;
use App\Models\Tenant;
use App\Models\Tip;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    protected array $codeCounters = [];

    protected function nextCode($tenant): string
    {
        $n = ($this->codeCounters[$tenant->slug] = ($this->codeCounters[$tenant->slug] ?? 5000) + 1);

        return $tenant->code_prefix.'-'.str_pad((string) $n, 4, '0', STR_PAD_LEFT);
    }

    public function run(): void
    {
        mt_srand(20261101); // deterministic demo data

        $this->tirta();
        $this->juniper();
        $this->rona();

        User::create([
            'name' => 'Adi Kusuma',
            'email' => 'platform@lulur.test',
            'password' => Hash::make('password'),
            'is_platform_admin' => true,
        ]);
    }

    // ---------------------------------------------------------------- TIRTA
    protected function tirta(): void
    {
        $tenant = Tenant::create([
            'id' => $this->uid(),
            'slug' => 'tirta',
            'name' => 'Tirta Spa',
            'currency' => 'IDR',
            'default_timezone' => 'Asia/Makassar',
            'plan' => 'growth',
            'code_prefix' => 'TRT',
            'branding' => [
                'logo_letter' => 'T',
                'hero' => '/img/p-hero.jpg',
                'tagline' => 'Balinese rituals in the rice fields of Ubud',
                'rating' => '4.9',
                'reviews' => '1,284',
                'region' => 'Bali, Indonesia',
            ],
            'settings' => [
                'booking_policy' => [
                    'deposit_percent' => 30,
                    'cancel_window_hours' => 24,
                    'no_show_fee_percent' => 50,
                    'saved_card_mode' => 'optional',
                ],
                'review_url' => 'https://reviews.example/tirta',
            ],
        ]);

        $ubud = Location::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Ubud', 'slug' => 'ubud',
            'timezone' => 'Asia/Makassar', 'address' => 'Jl. Raya Sayan, Ubud', 'phone' => '+62 361 555 014',
            'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], [['09:00', '21:00']]),
            'holidays' => [],
        ]);
        $seminyak = Location::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Seminyak', 'slug' => 'seminyak',
            'timezone' => 'Asia/Makassar', 'address' => 'Jl. Kayu Aya 22, Seminyak', 'phone' => '+62 361 555 018',
            'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], [['10:00', '22:00']]),
        ]);

        $room = fn ($name, $type, $cap, $sort, $loc = null) => Room::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => ($loc ?? $ubud)->id,
            'name' => $name, 'room_type' => $type, 'capacity' => $cap, 'sort' => $sort,
        ]);
        $kamboja1 = $room('Kamboja 1', 'single', 1, 1);
        $kamboja2 = $room('Kamboja 2', 'single', 1, 2);
        $kamboja3 = $room('Kamboja 3', 'single', 1, 3);
        $garden = $room('Garden Bale', 'single', 1, 4);
        $melati = $room('Melati', 'facial', 1, 5);
        $teratai = $room('Teratai Suite', 'couples', 2, 6);
        $sRoom = fn ($n, $i) => Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $seminyak->id, 'name' => $n, 'room_type' => 'single', 'capacity' => 1, 'sort' => $i]);
        $cempaka1 = $sRoom('Cempaka 1', 1); $cempaka2 = $sRoom('Cempaka 2', 2); $sRoom('Anggrek', 3);

        $seminyakStaff = [];
        foreach ([['Ayu Kartika', 'female', 'senior'], ['Gede Wire', 'male', 'junior'], ['Putu Eka', 'male', 'senior']] as $i => [$name, $gender, $level]) {
            $seminyakStaff[$name] = Staff::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'display_name' => $name, 'gender' => $gender, 'level' => $level, 'sort' => 10 + $i]);
        }

        $staffDef = [
            ['Made Artana', 'male', 'senior', null, 1],
            ['Komang Sari', 'male', 'master', null, 2],
            ['Wayan Putra', 'male', 'senior', null, 3],
            ['Ketut Darma', 'male', 'junior', null, 4],
            ['Nyoman Ayu', 'female', 'master', null, 5],
            ['Luh Indah', 'female', 'senior', 'Facial', 6],
        ];
        $staff = [];
        foreach ($staffDef as [$name, $gender, $level, $specialty, $sort]) {
            $staff[$name] = Staff::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'display_name' => $name,
                'gender' => $gender, 'level' => $level, 'specialty' => $specialty, 'sort' => $sort,
                'photo' => null,
            ]);
        }
        $made = $staff['Made Artana']; $komang = $staff['Komang Sari']; $wayan = $staff['Wayan Putra'];
        $ketut = $staff['Ketut Darma']; $nyoman = $staff['Nyoman Ayu']; $luh = $staff['Luh Indah'];

        $users = [
            ['Putri Wijaya', 'owner@tirta.test', 'owner', null],
            ['Sari Dewi', 'frontdesk@tirta.test', 'front_desk', null],
            ['Komang Sari', 'komang@tirta.test', 'therapist', $komang->id],
        ];
        foreach ($users as [$name, $email, $role, $staffId]) {
            $user = User::create(['name' => $name, 'email' => $email, 'password' => Hash::make('password')]);
            Membership::create(['tenant_id' => $tenant->id, 'user_id' => $user->id, 'role' => $role, 'staff_id' => $staffId]);
        }

        $cats = [];
        foreach (['Massage', 'Rituals', 'Couples', 'Face'] as $i => $name) {
            $cats[$name] = ServiceCategory::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => $name, 'sort' => $i]);
        }

        // ---- forms
        $spaForm = Form::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Spa health form', 'kind' => 'intake']);
        $spaV3 = FormVersion::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'form_id' => $spaForm->id, 'version' => 3,
            'fields' => [
                ['id' => 'pregnant', 'type' => 'bool_seg', 'label' => 'Are you pregnant or could you be?'],
                ['id' => 'blood_pressure', 'type' => 'bool_seg', 'label' => 'High blood pressure or heart condition?'],
                ['id' => 'injury', 'type' => 'bool_seg', 'label' => 'Injury or surgery in the last 6 months?'],
                ['id' => 'nut_allergy', 'type' => 'bool_seg', 'label' => 'Allergic to nuts or nut oils?'],
            ],
            'consent_text' => 'I confirm the information above is correct and agree to the Tirta Spa treatment consent.',
            'published_at' => now()->subMonths(1),
        ]);
        $spaForm->update(['active_version_id' => $spaV3->id]);

        $facialForm = Form::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Facial consent', 'kind' => 'consent']);
        $facialV2 = FormVersion::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'form_id' => $facialForm->id, 'version' => 2,
            'fields' => [
                ['id' => 'sensitive', 'type' => 'bool_seg', 'label' => 'Sensitive or reactive skin?'],
                ['id' => 'retinoids', 'type' => 'bool_seg', 'label' => 'Used retinoids or peels in the last 2 weeks?'],
            ],
            'consent_text' => 'I consent to the facial treatment, including enzyme peels where booked.',
            'published_at' => now()->subMonths(2),
        ]);
        $facialForm->update(['active_version_id' => $facialV2->id]);

        // ---- addons
        $scalp = Addon::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Scalp massage', 'duration_min' => 15, 'price' => 120000]);
        $aroma = Addon::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Aromatherapy oil upgrade', 'duration_min' => 0, 'price' => 60000]);
        $eye = Addon::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Eye mask', 'duration_min' => 0, 'price' => 50000]);

        // ---- services
        $svc = function (string $name, string $cat, array $def) use ($tenant, $cats, $spaForm, $facialForm) {
            $s = Service::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $cats[$cat]->id,
                'name' => $name, 'slug' => \Illuminate\Support\Str::slug($name),
                'description' => $def['desc'], 'photo' => $def['photo'], 'buffer_min' => $def['buffer'] ?? 15,
                'room_type' => $def['room'], 'therapists_needed' => $def['therapists'] ?? 1,
                'max_guests' => $def['guests'] ?? 1, 'price_basis' => $def['basis'] ?? 'per_guest',
                'requires_form_id' => $def['form'] ?? null, 'badge' => $def['badge'] ?? null,
                'bookable_online' => $def['online'] ?? true, 'sort' => $def['sort'],
            ]);
            foreach ($def['variants'] as $i => [$min, $price]) {
                ServiceVariant::create([
                    'id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $s->id,
                    'duration_min' => $min, 'price' => $price, 'sort' => $i,
                    'price_by_level' => $def['by_level'] ?? [],
                ]);
            }

            return $s;
        };

        $balinese = $svc('Balinese Massage', 'Massage', [
            'desc' => 'Long strokes, acupressure and warm coconut oil. Our most booked treatment.',
            'photo' => '/img/p-balinese.jpg', 'room' => 'single', 'form' => $spaForm->id, 'sort' => 1,
            'variants' => [[60, 450000], [90, 600000]],
        ]);
        $hotstone = $svc('Hot Stone Massage', 'Massage', [
            'desc' => 'Basalt stones warmed to 50 °C melt tension in the back and shoulders.',
            'photo' => '/img/p-stone.jpg', 'room' => 'single', 'form' => $spaForm->id, 'sort' => 2,
            'variants' => [[90, 750000]],
        ]);
        $lulur = $svc('Lulur Royal Ritual', 'Rituals', [
            'desc' => 'Javanese turmeric scrub, yoghurt splash and a frangipani bath.',
            'photo' => '/img/p-flowers.jpg', 'room' => 'single', 'badge' => 'signature', 'form' => $spaForm->id, 'sort' => 3,
            'variants' => [[120, 980000]],
        ]);
        $facial = $svc('Signature Facial', 'Face', [
            'desc' => 'Cleanse, enzyme peel and a cooling mask with local botanicals.',
            'photo' => '/img/p-facial.jpg', 'room' => 'facial', 'form' => $facialForm->id, 'sort' => 4,
            'variants' => [[60, 520000]],
        ]);
        $couples = $svc('Couples Ritual', 'Couples', [
            'desc' => 'Side-by-side Balinese massage in the Teratai Suite, then a flower bath for two.',
            'photo' => '/img/p-couples.jpg', 'room' => 'couples', 'therapists' => 2, 'guests' => 2,
            'basis' => 'per_booking', 'form' => $spaForm->id, 'sort' => 5,
            'variants' => [[120, 1850000], [150, 2200000]],
        ]);
        $seminyakBalinese = $svc('Balinese Massage (Seminyak)', 'Massage', [
            'desc' => 'The classic Balinese massage at our Seminyak beach house.',
            'photo' => '/img/p-balinese.jpg', 'room' => 'single', 'online' => true, 'sort' => 6,
            'variants' => [[60, 480000], [90, 640000]],
        ]);

        $skills = [
            $balinese->id => [$made, $komang, $wayan, $ketut, $nyoman],
            $hotstone->id => [$made, $komang, $wayan, $nyoman],
            $lulur->id => [$made, $komang, $wayan, $ketut, $nyoman],
            $facial->id => [$luh],
            $couples->id => [$made, $komang, $wayan, $nyoman],
            $seminyakBalinese->id => [],
        ];
        foreach ($skills as $serviceId => $list) {
            foreach ($list as $s) {
                \Illuminate\Support\Facades\DB::table('staff_skills')->insert([
                    'staff_id' => $s->id, 'service_id' => $serviceId, 'tenant_id' => $tenant->id,
                ]);
            }
        }
        foreach ([$balinese, $hotstone, $lulur, $couples] as $s) {
            $s->addons()->syncWithPivotValues([$scalp->id, $aroma->id], ['tenant_id' => $tenant->id]);
        }
        $facial->addons()->syncWithPivotValues([$eye->id], ['tenant_id' => $tenant->id]);

        // ---- packages & gift card
        $pkg = Package::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $facial->id,
            'name' => '5× Signature Facial', 'sessions_count' => 5, 'price' => 2210000,
            'valid_months' => 6, 'discount_percent' => 15,
        ]);
        GiftCard::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'code' => 'TIRTA-GIFT-250',
            'initial_amount' => 250000, 'balance' => 250000, 'expires_at' => now()->addYear(),
        ]);

        // ---- 6 weeks of history for Ubud + Seminyak
        foreach ([
            [$ubud, [$made, $komang, $wayan, $ketut, $nyoman, $luh], [$kamboja1, $kamboja2, $kamboja3, $garden, $melati, $teratai], [$balinese, $hotstone, $lulur, $facial]],
            [$seminyak, array_values($seminyakStaff), [$cempaka1, $cempaka2], [$balinese, $lulur]],
        ] as [$loc, $staffList, $roomList, $serviceList]) {
            $this->history($tenant, $loc, $staffList, $roomList, $serviceList);
        }

        // ---- demo day: exactly the mockup calendar (Ubud, today)
        $this->tirtaDemoDay($tenant, $ubud, $pkg, compact('made', 'komang', 'wayan', 'ketut', 'nyoman', 'luh', 'kamboja1', 'kamboja2', 'kamboja3', 'garden', 'melati', 'teratai', 'balinese', 'hotstone', 'lulur', 'facial', 'couples', 'scalp'));

        // shifts for the next 14 days so the booking flow works out of the box
        foreach ([$made, $komang, $wayan, $ketut, $nyoman, $luh] as $s) {
            $this->forwardShifts($tenant, $ubud, $s);
        }
        foreach ($seminyakStaff as $s) {
            $this->forwardShifts($tenant, $seminyak, $s, '10:00', '20:00');
        }
    }

    /** The demo calendar from docs/SCREENS.md note A01. */
    protected function tirtaDemoDay($tenant, $ubud, $pkg, $r): void
    {
        $today = CarbonImmutable::today($ubud->timezone);
        $at = fn (string $time) => $today->setTimeFromTimeString($time)->timezone('UTC');

        $client = fn ($name) => Client::firstOrCreate(
            ['tenant_id' => $tenant->id, 'name' => $name],
            ['avatar_hue' => \App\Support\Str::hue($name), 'phone_e164' => '+62 8'.random_int(1000000000, 9999999999)]
        );

        // [staff, room, client, service, variant_min, start, end, status, source, form_signed, note]
        $rows = [
            // Made A.
            [$r['made'], $r['kamboja1'], 'Sarah Mitchell', $r['balinese'], 90, '09:30', '11:00', BookingStatus::Completed, 'online', true, null],
            [$r['made'], $r['kamboja2'], 'Hana Sato', $r['hotstone'], 90, '16:00', '17:30', BookingStatus::Confirmed, 'online', false, 'form missing flag'],
            [$r['made'], $r['kamboja1'], 'Putu Wirawan', $r['balinese'], 60, '18:30', '19:30', BookingStatus::Held, 'online', false, 'deposit pending'],
            // Komang S.
            [$r['komang'], $r['kamboja2'], 'Chloé Martin', $r['lulur'], 120, '10:00', '12:00', BookingStatus::Completed, 'online', true, null],
            [$r['komang'], $r['kamboja3'], 'Daniel Kim', $r['balinese'], 60, '12:45', '13:45', BookingStatus::NoShow, 'online', true, 'no-show'],
            [$r['komang'], $r['kamboja2'], 'Ana Souza', $r['hotstone'], 90, '14:00', '15:30', BookingStatus::InService, 'online', true, null],
            [$r['komang'], $r['kamboja3'], 'Mia Hoffmann', $r['lulur'], 120, '17:00', '19:00', BookingStatus::Confirmed, 'online', true, null],
            // Wayan P.
            [$r['wayan'], $r['garden'], 'Tom Becker', $r['balinese'], 60, '09:00', '10:00', BookingStatus::Completed, 'online', true, null],
            [$r['wayan'], $r['kamboja3'], 'Raj Patel', $r['balinese'], 90, '11:00', '12:30', BookingStatus::Completed, 'phone', true, null],
            [$r['wayan'], $r['garden'], 'Olivia Brown', $r['balinese'], 60, '15:30', '16:30', BookingStatus::Confirmed, 'online', true, null],
            [$r['wayan'], $r['kamboja2'], 'Lucas Meyer', $r['hotstone'], 90, '18:00', '19:30', BookingStatus::Confirmed, 'online', true, null],
            // Ketut D. (shift starts 11:00)
            [$r['ketut'], $r['kamboja1'], 'Aiko Tanaka', $r['balinese'], 60, '11:30', '12:30', BookingStatus::Completed, 'online', true, null],
            [$r['ketut'], $r['kamboja1'], 'Grace Lee', $r['balinese'], 60, '14:30', '15:30', BookingStatus::CheckedIn, 'online', true, null],
            [$r['ketut'], $r['kamboja1'], 'Sophie Laurent', $r['lulur'], 120, '16:00', '18:00', BookingStatus::Confirmed, 'online', true, null],
            // Nyoman A.
            [$r['nyoman'], $r['kamboja3'], 'James Carter', $r['hotstone'], 90, '09:00', '10:30', BookingStatus::Completed, 'online', true, null],
            [$r['nyoman'], $r['garden'], 'Ben Turner', $r['balinese'], 90, '12:00', '13:30', BookingStatus::Completed, 'online', true, null],
            [$r['nyoman'], $r['kamboja3'], 'Isabel García', $r['balinese'], 90, '15:00', '16:30', BookingStatus::Confirmed, 'online', true, null],
            [$r['nyoman'], $r['garden'], 'Kadek (walk-in)', $r['balinese'], 60, '19:00', '20:00', BookingStatus::Confirmed, 'walk_in', false, 'walk-in'],
            // Luh I. (shift ends 18:00)
            [$r['luh'], $r['melati'], 'Priya Nair', $r['facial'], 60, '10:00', '11:00', BookingStatus::Completed, 'online', true, null],
            [$r['luh'], $r['melati'], 'Yuki Mori', $r['facial'], 60, '13:30', '14:30', BookingStatus::InService, 'online', true, null],
            [$r['luh'], $r['melati'], 'Laura Rossi', $r['facial'], 60, '16:00', '17:00', BookingStatus::Confirmed, 'online', true, 'package 3 of 5'],
        ];

        $created = [];
        foreach ($rows as [$staff, $room, $clientName, $service, $minutes, $start, $end, $status, $source, $formSigned, $note]) {
            $variant = ServiceVariant::where('service_id', $service->id)->orderBy('duration_min')->get()
                ->first(fn ($v) => $v->duration_min === $minutes) ?? ServiceVariant::where('service_id', $service->id)->orderBy('duration_min')->first();
            $c = $client($clientName);

            $booking = Booking::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $ubud->id,
                'client_id' => $source === 'walk_in' ? null : $c->id,
                'code' => $this->nextCode($tenant),
                'status' => $status->value, 'source' => $source,
                'policy_snapshot' => $tenant->policySnapshot(),
                'total' => $variant->price,
                'deposit_due' => (int) (round($variant->price * 30 / 1000) * 1000),
                'deposit_paid' => in_array($status, [BookingStatus::Completed, BookingStatus::InService, BookingStatus::CheckedIn], true)
                || ($status === BookingStatus::Confirmed && $note !== 'form missing flag') ? (int) (round($variant->price * 30 / 1000) * 1000) : 0,
                'confirmed_at' => $status !== BookingStatus::Held ? $at($start)->subDays(random_int(2, 9)) : null,
                'checked_in_at' => $status === BookingStatus::CheckedIn ? $at($start) : null,
                'completed_at' => $status === BookingStatus::Completed ? $at($end) : null,
                'created_at' => $at($start)->subDays(random_int(2, 9)),
                'updated_at' => now(),
            ]);

            $item = BookingItem::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id,
                'service_variant_id' => $variant->id, 'service_id' => $service->id,
                'guest_name' => $clientName, 'guests' => 1,
                'starts_at' => $at($start), 'ends_at' => $at($end), 'duration_min' => $minutes,
                'price' => $variant->price,
            ]);
            BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $item->id, 'staff_id' => $staff->id, 'starts_at' => $at($start), 'ends_at' => $at($end)]);
            BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $item->id, 'room_id' => $room->id, 'starts_at' => $at($start), 'ends_at' => $at($end)]);

            if ($formSigned) {
                $version = $service->requires_form_id ? Form::find($service->requires_form_id)->activeVersion : null;
                if ($version) {
                    \App\Models\FormSubmission::create([
                        'id' => $this->uid(), 'tenant_id' => $tenant->id, 'form_version_id' => $version->id,
                        'booking_id' => $booking->id, 'client_id' => $c->id, 'guest_name' => $clientName,
                        'answers' => ['pregnant' => false, 'blood_pressure' => false, 'injury' => false, 'nut_allergy' => str_contains($clientName, 'Mia')],
                        'signature' => 'M10 55 C 30 10, 45 70, 60 40 S 90 20, 100 50 S 130 70, 140 35',
                        'signed_name' => $clientName, 'signed_at' => $booking->created_at,
                        'expires_at' => now()->addMonths(12),
                    ]);
                }
            }

            // a scalp add-on for Emma/Liam handled below; tip for a completed session
            if ($status === BookingStatus::Completed && mt_rand(1, 100) <= 60) {
                $tipAmount = [50000, 75000, 100000, 150000][array_rand([1, 2, 3, 4])];
                $tipPayment = Payment::create([
                    'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id,
                    'client_id' => $c->id, 'gateway' => 'midtrans', 'method' => 'card', 'kind' => 'tip',
                    'amount' => $tipAmount, 'status' => 'succeeded', 'idempotency_key' => $this->uid(),
                    'paid_at' => $at($end),
                ]);
                Tip::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'payment_id' => $tipPayment->id, 'staff_id' => $staff->id, 'booking_id' => $booking->id, 'amount' => $tipAmount]);
                $booking->update(['tip_total' => $tipAmount]);
            }
            $created[$clientName] = $booking;
        }

        // ---- couples booking: Emma & Liam Walsh, 2 therapists + Teratai Suite
        $emma = $client('Emma Walsh');
        $emma->update(['pressure_pref' => 'medium', 'avoid_areas' => 'neck', 'phone_e164' => '+447700900418', 'email' => 'emma.walsh@example.com', 'allergies' => 'Nut allergy — sunflower oil only']);
        $coupleStart = $at('13:00'); $coupleEnd = $at('15:00');
        $cVariant = ServiceVariant::where('service_id', $r['couples']->id)->orderBy('duration_min')->first();
        $couple = Booking::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $ubud->id,
            'client_id' => $emma->id, 'code' => 'TRT-4471',
            'status' => BookingStatus::InService->value, 'source' => 'online',
            'policy_snapshot' => $tenant->policySnapshot(),
            'total' => 1970000, 'deposit_due' => 591000, 'deposit_paid' => 591000,
            'confirmed_at' => $today->subDays(4), 'created_at' => $today->subDays(4), 'updated_at' => now(),
        ]);
        $cItem = BookingItem::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $couple->id,
            'service_variant_id' => $cVariant->id, 'service_id' => $r['couples']->id,
            'guest_name' => 'Emma & Liam Walsh', 'guests' => 2,
            'starts_at' => $coupleStart, 'ends_at' => $coupleEnd, 'duration_min' => 120, 'price' => 1970000,
        ]);
        BookingItemAddon::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $cItem->id,
            'addon_id' => $r['scalp']->id, 'name' => 'Scalp massage', 'duration_min' => 15, 'price' => 120000,
        ]);
        foreach ([$r['made'], $r['wayan']] as $s) {
            BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $cItem->id, 'staff_id' => $s->id, 'starts_at' => $coupleStart, 'ends_at' => $coupleEnd]);
        }
        BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $cItem->id, 'room_id' => $r['teratai']->id, 'starts_at' => $coupleStart, 'ends_at' => $coupleEnd]);

        $spaForm = Form::where('tenant_id', $tenant->id)->where('name', 'Spa health form')->first();
        foreach (['Emma Walsh' => ['nut_allergy' => true], 'Liam Walsh' => []] as $guestName => $answers) {
            \App\Models\FormSubmission::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'form_version_id' => $spaForm->active_version_id,
                'booking_id' => $couple->id, 'client_id' => $emma->id, 'guest_name' => $guestName,
                'answers' => $answers + ['pregnant' => false, 'blood_pressure' => false, 'injury' => false],
                'signature' => 'M10 55 C 30 10, 45 70, 60 40 S 90 20, 100 50',
                'signed_name' => $guestName, 'signed_at' => $today->subDays(2),
                'expires_at' => now()->addMonths(12),
            ]);
        }

        // deposit payment for the couples booking (QRIS)
        Payment::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $couple->id, 'client_id' => $emma->id,
            'gateway' => 'midtrans', 'method' => 'qris', 'kind' => 'deposit', 'amount' => 591000,
            'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'paid_at' => $today->subDays(4),
        ]);

        // ---- Laura Rossi: package client, 5× facial, session 3 today
        $laura = $client('Laura Rossi');
        $laura->update(['phone_e164' => '+393475550192', 'email' => 'laura.rossi@example.com', 'notes' => 'Skin improved a lot since session 1. Suggest hydrating mask add-on next time. — Luh Indah, '.now()->subDays(20)->format('d M')]);
        $cp = ClientPackage::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'client_id' => $laura->id, 'package_id' => $pkg->id,
            'purchased_at' => $today->subDays(41), 'expires_at' => $today->subDays(41)->addMonths(6),
            'sessions_total' => 5, 'sessions_left' => 2,
        ]);
        // two past package visits (mockup: 3 used incl. today, 2 left)
        $facialVariant = ServiceVariant::where('service_id', $r['facial']->id)->first();
        foreach ([['today-41', 0], ['today-20', 150000]] as $i => [$when, $tipAmount]) {
            // pick a free hour for Luh on that day (history fills 09:00–20:00)
            $pastDay = $when === 'today-41' ? $today->subDays(41) : $today->subDays(20);
            // first hour where neither Luh nor Melati overlaps any existing booking (buffer included)
            $overlaps = fn ($h) => \App\Models\BookingResource::query()
                ->where('status', 'active')
                ->where(fn ($q) => $q->where('staff_id', $r['luh']->id)->orWhere('room_id', $r['melati']->id))
                ->where('starts_at', '<', $pastDay->setTime($h, 0)->addMinutes(75))
                ->where('ends_at', '>', $pastDay->setTime($h, 0))
                ->exists();
            $hour = 9;
            while ($hour < 20 && $overlaps($hour)) {
                $hour++;
            }
            $pastStart = $pastDay->setTime($hour, 0);
            $pastEnd = $pastStart->addMinutes(60);
            $pastBooking = Booking::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $ubud->id,
                'client_id' => $laura->id, 'code' => $this->nextCode($tenant),
                'status' => BookingStatus::Completed->value, 'source' => 'online',
                'policy_snapshot' => $tenant->policySnapshot(),
                'total' => $facialVariant->price, 'deposit_due' => 156000, 'deposit_paid' => 156000,
                'completed_at' => $pastEnd, 'created_at' => $pastStart->subDays(3), 'updated_at' => $pastEnd,
            ]);
            $pastItem = BookingItem::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $pastBooking->id,
                'service_variant_id' => $facialVariant->id, 'service_id' => $r['facial']->id,
                'guest_name' => 'Laura Rossi', 'guests' => 1,
                'starts_at' => $pastStart, 'ends_at' => $pastEnd, 'duration_min' => 60,
                'price' => $facialVariant->price,
            ]);
            BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $pastItem->id, 'staff_id' => $r['luh']->id, 'starts_at' => $pastStart, 'ends_at' => $pastEnd]);
            BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $pastItem->id, 'room_id' => $r['melati']->id, 'starts_at' => $pastStart, 'ends_at' => $pastEnd]);
            Payment::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $pastBooking->id, 'client_id' => $laura->id, 'gateway' => 'midtrans', 'method' => 'qris', 'kind' => 'balance', 'amount' => $facialVariant->price - 156000, 'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'paid_at' => $pastEnd]);
            PackageRedemption::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'client_package_id' => $cp->id,
                'booking_item_id' => $pastItem->id, 'redeemed_at' => $pastStart,
            ]);
        }
        $todayLaura = $created['Laura Rossi'];
        PackageRedemption::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'client_package_id' => $cp->id,
            'booking_item_id' => $todayLaura->items->first()->id, 'redeemed_at' => now(),
        ]);
    }

    // ------------------------------------------------------------- JUNIPER
    protected function juniper(): void
    {
        $tenant = Tenant::create([
            'id' => $this->uid(), 'slug' => 'juniper', 'name' => 'Juniper Massage',
            'currency' => 'USD', 'default_timezone' => 'America/New_York', 'plan' => 'starter',
            'code_prefix' => 'JNP',
            'branding' => ['logo_letter' => 'J', 'hero' => '/img/stone.jpg', 'tagline' => 'Deep work for desk shoulders — Center City, Philadelphia', 'rating' => '4.8', 'reviews' => '412', 'region' => 'Philadelphia, US'],
            'settings' => [
                'booking_policy' => ['deposit_percent' => 0, 'cancel_window_hours' => 12, 'no_show_fee_percent' => 50, 'saved_card_mode' => 'required'],
                'review_url' => 'https://reviews.example/juniper',
            ],
        ]);
        $cc = Location::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Center City', 'slug' => 'center-city',
            'timezone' => 'America/New_York', 'address' => '1211 Chestnut St, Philadelphia',
            'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri'], [['09:00', '20:00']])
                + array_fill_keys(['sat'], [['10:00', '18:00']]) + array_fill_keys(['sun'], []),
        ]);

        $cedar1 = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $cc->id, 'name' => 'Cedar 1', 'room_type' => 'single', 'capacity' => 1, 'sort' => 1]);
        $cedar2 = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $cc->id, 'name' => 'Cedar 2', 'room_type' => 'single', 'capacity' => 1, 'sort' => 2]);
        $maple = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $cc->id, 'name' => 'Maple Suite', 'room_type' => 'couples', 'capacity' => 2, 'sort' => 3]);

        $staff = [];
        foreach ([['Devin Carter', 'male', 'senior'], ['Ashley Boone', 'female', 'senior'], ['Marcus Lee', 'male', 'master'], ['Rosa Vega', 'female', 'junior']] as $i => [$name, $gender, $level]) {
            $staff[$name] = Staff::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'display_name' => $name, 'gender' => $gender, 'level' => $level, 'sort' => $i + 1]);
        }
        $owner = User::create(['name' => 'Kelsey Nguyen', 'email' => 'owner@juniper.test', 'password' => Hash::make('password')]);
        Membership::create(['tenant_id' => $tenant->id, 'user_id' => $owner->id, 'role' => 'owner']);

        $jcat = ServiceCategory::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Massage', 'sort' => 1]);
        $swedish = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $jcat->id, 'name' => 'Swedish Massage', 'slug' => 'swedish-massage', 'description' => 'Classic flowing strokes to unwind.', 'photo' => '/img/balinese.jpg', 'buffer_min' => 10, 'room_type' => 'single', 'bookable_online' => true, 'sort' => 1]);
        foreach ([[60, 9000], [90, 12500]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $swedish->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);
        $deep = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $jcat->id, 'name' => 'Deep Tissue', 'slug' => 'deep-tissue', 'description' => 'Focused pressure for chronic knots.', 'photo' => '/img/stone.jpg', 'buffer_min' => 15, 'room_type' => 'single', 'bookable_online' => true, 'sort' => 2]);
        foreach ([[60, 11000], [90, 14500]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $deep->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);
        $couplesS = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $jcat->id, 'name' => 'Couples Massage', 'slug' => 'couples-massage', 'description' => 'Two tables, one quiet room.', 'photo' => '/img/couples.jpg', 'buffer_min' => 20, 'room_type' => 'couples', 'therapists_needed' => 2, 'max_guests' => 2, 'price_basis' => 'per_booking', 'bookable_online' => true, 'sort' => 3]);
        foreach ([[90, 22000]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $couplesS->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);

        foreach ($staff as $s) {
            foreach ([$swedish, $deep] as $svc) {
                \Illuminate\Support\Facades\DB::table('staff_skills')->insert(['staff_id' => $s->id, 'service_id' => $svc->id, 'tenant_id' => $tenant->id]);
            }
            \Illuminate\Support\Facades\DB::table('staff_skills')->insert(['staff_id' => $s->id, 'service_id' => $couplesS->id, 'tenant_id' => $tenant->id]);
        }

        $this->history($tenant, $cc, array_values($staff), [$cedar1, $cedar2, $maple], [$swedish, $deep, $couplesS]);
        foreach ($staff as $s) {
            $this->forwardShifts($tenant, $cc, $s);
        }
    }

    // ---------------------------------------------------------------- RONA
    protected function rona(): void
    {
        $tenant = Tenant::create([
            'id' => $this->uid(), 'slug' => 'rona', 'name' => 'Rona Aesthetic',
            'currency' => 'IDR', 'default_timezone' => 'Asia/Jakarta', 'plan' => 'growth',
            'code_prefix' => 'RNA',
            'branding' => ['logo_letter' => 'R', 'hero' => '/img/facial.jpg', 'tagline' => 'Klinik estetika dengan consent digital', 'rating' => '4.9', 'reviews' => '638', 'region' => 'Jakarta, Indonesia'],
            'settings' => [
                'booking_policy' => ['deposit_percent' => 50, 'cancel_window_hours' => 48, 'no_show_fee_percent' => 100, 'saved_card_mode' => 'optional'],
                'review_url' => 'https://reviews.example/rona',
            ],
        ]);
        $scbd = Location::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'SCBD', 'slug' => 'scbd',
            'timezone' => 'Asia/Jakarta', 'address' => 'Jl. Jend. Sudirman Kav 52-53, Jakarta',
            'opening_hours' => array_fill_keys(['mon', 'tue', 'wed', 'thu', 'fri', 'sat'], [['10:00', '19:00']]) + array_fill_keys(['sun'], []),
        ]);
        $t1 = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $scbd->id, 'name' => 'Treatment 1', 'room_type' => 'facial', 'capacity' => 1, 'sort' => 1]);
        $t2 = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $scbd->id, 'name' => 'Treatment 2', 'room_type' => 'facial', 'capacity' => 1, 'sort' => 2]);
        $consult = Room::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $scbd->id, 'name' => 'Consult Room', 'room_type' => 'single', 'capacity' => 1, 'sort' => 3]);

        $staff = [];
        foreach ([['dr. Amara Rahma', 'female', 'master'], ['Nadia Putri', 'female', 'senior'], ['Sinta Wulandari', 'female', 'junior']] as $i => [$name, $gender, $level]) {
            $staff[$name] = Staff::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'display_name' => $name, 'gender' => $gender, 'level' => $level, 'sort' => $i + 1]);
        }
        $owner = User::create(['name' => 'dr. Rona Ayu', 'email' => 'owner@rona.test', 'password' => Hash::make('password')]);
        Membership::create(['tenant_id' => $tenant->id, 'user_id' => $owner->id, 'role' => 'owner']);

        $consentForm = Form::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Aesthetic consent', 'kind' => 'consent']);
        $v1 = FormVersion::create([
            'id' => $this->uid(), 'tenant_id' => $tenant->id, 'form_id' => $consentForm->id, 'version' => 4,
            'fields' => [
                ['id' => 'isotretinoin', 'type' => 'bool_seg', 'label' => 'Taking isotretinoin (Accutane)?'],
                ['id' => 'pregnant', 'type' => 'bool_seg', 'label' => 'Pregnant or breastfeeding?'],
                ['id' => 'fillers', 'type' => 'bool_seg', 'label' => 'Fillers or botox in the last 3 months?'],
            ],
            'consent_text' => 'Saya setuju dengan penjelasan prosedur dan risiko treatment estetika.',
            'published_at' => now()->subMonths(3),
        ]);
        $consentForm->update(['active_version_id' => $v1->id]);

        $rcat = ServiceCategory::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'name' => 'Treatments', 'sort' => 1]);
        $laser = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $rcat->id, 'name' => 'Laser Rejuvenation', 'slug' => 'laser-rejuvenation', 'description' => 'Gentle laser for glow and texture.', 'photo' => '/img/p-facial.jpg', 'buffer_min' => 20, 'room_type' => 'facial', 'requires_form_id' => $consentForm->id, 'bookable_online' => true, 'sort' => 1]);
        foreach ([[60, 1200000]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $laser->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);
        $hydra = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $rcat->id, 'name' => 'HydraGlow Facial', 'slug' => 'hydraglow-facial', 'description' => 'Deep cleanse, extraction, hydration.', 'photo' => '/img/p-flowers.jpg', 'buffer_min' => 15, 'room_type' => 'facial', 'requires_form_id' => $consentForm->id, 'bookable_online' => true, 'sort' => 2]);
        foreach ([[60, 850000]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $hydra->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);
        $peel = Service::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'category_id' => $rcat->id, 'name' => 'Chemical Peel', 'slug' => 'chemical-peel', 'description' => 'Medium-depth peel, 5-day downtime.', 'photo' => '/img/p-stone.jpg', 'buffer_min' => 20, 'room_type' => 'facial', 'requires_form_id' => $consentForm->id, 'bookable_online' => false, 'sort' => 3]);
        foreach ([[45, 950000]] as $i => [$m, $p]) ServiceVariant::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $peel->id, 'duration_min' => $m, 'price' => $p, 'sort' => $i]);

        foreach ($staff as $s) {
            foreach ([$laser, $hydra, $peel] as $svc) {
                \Illuminate\Support\Facades\DB::table('staff_skills')->insert(['staff_id' => $s->id, 'service_id' => $svc->id, 'tenant_id' => $tenant->id]);
            }
        }

        $pkg = Package::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'service_id' => $hydra->id, 'name' => '5× HydraGlow', 'sessions_count' => 5, 'price' => 3600000, 'valid_months' => 6, 'discount_percent' => 15]);

        $this->history($tenant, $scbd, array_values($staff), [$t1, $t2, $consult], [$laser, $hydra, $peel]);
        foreach ($staff as $s) {
            $this->forwardShifts($tenant, $scbd, $s, '10:00', '19:00');
        }
    }

    // ------------------------------------------------------------- helpers
    protected function uid(): string
    {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    /** ~6 weeks of deterministic history: completed visits, tips, some no-shows. */
    protected array $clientPool = [];

    protected function poolClient($tenant): Client
    {
        $pool = $this->clientPool[$tenant->slug] ?? [];
        // 35% of visits come back to a familiar face (rebooking metric)
        if ($pool && mt_rand(1, 100) <= 35) {
            return $pool[array_rand($pool)];
        }
        $client = Client::create([
            'tenant_id' => $tenant->id,
            'name' => $this->fakeName(),
            'phone_e164' => '+1'.random_int(2000000000, 9999999999),
            'avatar_hue' => mt_rand(1, 7),
            'pressure_pref' => ['light', 'medium', 'firm'][mt_rand(0, 2)],
        ]);
        $this->clientPool[$tenant->slug][] = $client;

        return $client;
    }

    /** ~6 weeks of deterministic history: completed visits, tips, some no-shows. */
    protected function history($tenant, $location, array $staffList, array $roomList, array $serviceList): void
    {
        $tz = $location->timezone;
        $services = collect($serviceList);

        for ($d = 42; $d >= 1; $d--) {
            $day = CarbonImmutable::today($tz)->subDays($d);
            $occupied = []; // roomId => [windows]
            $staffBusy = []; // staffId => [windows]
            if (in_array(strtolower($day->format('D')), ['sun'], true) && $tenant->slug === 'rona') {
                continue;
            }
            if (strtolower($day->format('D')) === 'sun' && $tenant->slug === 'juniper') {
                continue;
            }

            foreach ($staffList as $i => $s) {
                if (mt_rand(1, 100) <= 22) {
                    continue; // day off
                }
                // shift covering the working day so utilisation has a denominator
                Shift::create([
                    'id' => $this->uid(), 'tenant_id' => $tenant->id, 'staff_id' => $s->id,
                    'location_id' => $location->id,
                    'starts_at' => $day->setTime(9, 0), 'ends_at' => $day->setTime(21, 0),
                ]);
                $count = mt_rand(2, 4);
                $hour = 9;
                for ($k = 0; $k < $count; $k++) {
                    $service = $services->random();
                    $variant = ServiceVariant::where('service_id', $service->id)->inRandomOrder()->first();
                    if (! $variant) {
                        continue;
                    }
                    $minutes = $variant->duration_min;
                    $start = $day->setTime($hour, [0, 30][array_rand([0, 1])]);
                    $end = $start->addMinutes($minutes);
                    if ($end->hour >= 21 || $start->hour < 9) {
                        break;
                    }
                    $hour = min(19, $hour + intdiv($minutes, 60) + 1);

                    // first matching room with no overlap this day (couples suites
                    // only for couples services; facials only in facial rooms)
                    $room = collect($roomList)
                        ->filter(fn ($r) => $service->room_type === 'any'
                            || $r->room_type === $service->room_type
                            || ($service->room_type === 'single' && $r->room_type === 'single'))
                        ->first(fn ($r) => empty(array_filter(
                            $occupied[$r->id] ?? [],
                            fn ($w) => $start->lt($w[1]) && $end->gt($w[0])
                        )));
                    if (! $room) {
                        continue;
                    }
                    if (! empty(array_filter($staffBusy[$s->id] ?? [], fn ($w) => $start->lt($w[1]) && $end->gt($w[0])))) {
                        continue; // therapist already booked (hour cap edge cases)
                    }
                    $occupied[$room->id][] = [$start, $end];
                    $staffBusy[$s->id][] = [$start, $end];

                    $status = mt_rand(1, 100) <= 6 ? BookingStatus::NoShow : BookingStatus::Completed;
                    $client = $this->poolClient($tenant);

                    $deposit = $tenant->bookingPolicy()['deposit_percent'] > 0
                        ? (int) (round($variant->price * $tenant->bookingPolicy()['deposit_percent'] / 1000) * 1000)
                        : 0;

                    $booking = Booking::create([
                        'id' => $this->uid(), 'tenant_id' => $tenant->id, 'location_id' => $location->id,
                        'client_id' => $client->id, 'code' => $this->nextCode($tenant),
                        'status' => $status->value, 'source' => mt_rand(1, 100) <= 75 ? 'online' : 'phone',
                        'policy_snapshot' => $tenant->policySnapshot(),
                        'total' => $variant->price, 'deposit_due' => $deposit,
                        'deposit_paid' => $status === BookingStatus::Completed ? $deposit : $deposit,
                        'completed_at' => $status === BookingStatus::Completed ? $end : null,
                        'created_at' => $start->subDays(random_int(2, 10)), 'updated_at' => $end,
                    ]);

                    $item = BookingItem::create([
                        'id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id,
                        'service_variant_id' => $variant->id, 'service_id' => $service->id,
                        'guest_name' => $client->name, 'guests' => 1,
                        'starts_at' => $start, 'ends_at' => $end, 'duration_min' => $minutes, 'price' => $variant->price,
                    ]);
                    BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $item->id, 'staff_id' => $s->id, 'starts_at' => $start, 'ends_at' => $end]);
                    BookingResource::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_item_id' => $item->id, 'room_id' => $room->id, 'starts_at' => $start, 'ends_at' => $end]);

                    // deposit + balance payments for completed visits
                    if ($status === BookingStatus::Completed) {
                        if ($deposit > 0) {
                            Payment::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id, 'client_id' => $client->id, 'gateway' => $tenant->currency === 'IDR' ? 'midtrans' : 'stripe', 'method' => $tenant->currency === 'IDR' ? 'qris' : 'card', 'kind' => 'deposit', 'amount' => $deposit, 'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'paid_at' => $booking->created_at]);
                        }
                        $balance = $variant->price - $deposit;
                        if ($balance > 0) {
                            Payment::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id, 'client_id' => $client->id, 'gateway' => $tenant->currency === 'IDR' ? 'midtrans' : 'stripe', 'method' => 'card', 'kind' => 'balance', 'amount' => $balance, 'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'paid_at' => $end]);
                        }
                        if (mt_rand(1, 100) <= 55) {
                            $tip = $tenant->currency === 'IDR' ? [50000, 100000, 150000][mt_rand(0, 2)] : [1000, 1500, 2000][mt_rand(0, 2)];
                            $tipPayment = Payment::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id, 'client_id' => $client->id, 'gateway' => $tenant->currency === 'IDR' ? 'midtrans' : 'stripe', 'method' => 'card', 'kind' => 'tip', 'amount' => $tip, 'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'paid_at' => $end]);
                            Tip::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'payment_id' => $tipPayment->id, 'staff_id' => $s->id, 'booking_id' => $booking->id, 'amount' => $tip]);
                            $booking->update(['tip_total' => $tip]);
                        }
                    } else {
                        // no-show: Juniper charges fee from the saved card sometimes
                        if ($tenant->slug === 'juniper' && mt_rand(1, 100) <= 50) {
                            $client->update(['saved_card' => ['brand' => 'Visa', 'last4' => '4242', 'consent_at' => $booking->created_at->toIso8601String()]]);
                            Payment::create(['id' => $this->uid(), 'tenant_id' => $tenant->id, 'booking_id' => $booking->id, 'client_id' => $client->id, 'gateway' => 'stripe', 'method' => 'card', 'kind' => 'no_show_fee', 'amount' => (int) round($variant->price * 0.5), 'status' => 'succeeded', 'idempotency_key' => $this->uid(), 'meta' => ['actor' => 'Kelsey Nguyen', 'off_session' => true], 'paid_at' => $end]);
                        }
                    }
                }
            }
        }
    }

    protected function fakeName(): string
    {
        $first = ['Ayu', 'Budi', 'Citra', 'Dewi', 'Eka', 'Fajar', 'Gita', 'Hana', 'Indra', 'Jaya', 'Kadek', 'Lestari', 'Maya', 'Nadia', 'Oka', 'Putu', 'Ratna', 'Sari', 'Tono', 'Umar', 'Vina', 'Wayan', 'Yoga', 'Zahra', 'Emily', 'Jake', 'Sofia', 'Liam', 'Noah', 'Mia', 'Lucas', 'Emma', 'Ava', 'Ethan'];
        $last = ['Santoso', 'Wijaya', 'Kusuma', 'Halim', 'Pratama', 'Maulana', 'Saputra', 'Hartono', 'Nguyen', 'Tanaka', 'Kim', 'Walsh', 'Miller', 'Davis', 'García', 'Rossi', 'Meyer', 'Laurent', 'Patel', 'Brown'];

        return $first[array_rand($first)].' '.$last[array_rand($last)];
    }

    /** Shifts for the next 14 days so availability works out of the box. */
    protected function forwardShifts($tenant, $location, $staff, string $from = '09:00', string $to = '21:00'): void
    {
        $tz = $location->timezone;
        for ($i = 0; $i < 14; $i++) {
            $day = CarbonImmutable::today($tz)->addDays($i);
            if ($tenant->slug === 'juniper' && strtolower($day->format('D')) === 'sun') {
                continue;
            }
            if ($tenant->slug === 'rona' && strtolower($day->format('D')) === 'sun') {
                continue;
            }
            if (mt_rand(1, 100) <= 10) {
                continue; // occasional day off
            }
            Shift::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id, 'location_id' => $location->id,
                'starts_at' => $day->setTimeFromTimeString($from)->timezone('UTC'),
                'ends_at' => $day->setTimeFromTimeString($to)->timezone('UTC'),
            ]);
        }
        // today's shift always exists (demo calendar relies on it)
        $today = CarbonImmutable::today($tz);
        $exists = Shift::where('staff_id', $staff->id)->where('location_id', $location->id)
            ->where('starts_at', '<', $today->endOfDay())->where('ends_at', '>', $today->startOfDay())->exists();
        if (! $exists) {
            Shift::create([
                'id' => $this->uid(), 'tenant_id' => $tenant->id, 'staff_id' => $staff->id, 'location_id' => $location->id,
                'starts_at' => $today->setTimeFromTimeString($from)->timezone('UTC'),
                'ends_at' => $today->setTimeFromTimeString($to)->timezone('UTC'),
            ]);
        }
    }
}
