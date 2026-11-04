<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Support\TenantContext;
use Illuminate\Http\Request;

/** Rooms module (A07). */
class RoomAdminController extends Controller
{
    public function __construct(protected TenantContext $ctx)
    {
    }

    public function index(Request $request)
    {
        $tenant = $this->ctx->check();

        $rooms = $tenant->rooms()->with('location:id,name')->orderBy('sort')->get()->map(fn ($r) => [
            'id' => $r->id,
            'name' => $r->name,
            'location' => $r->location->name,
            'location_id' => $r->location_id,
            'room_type' => $r->room_type,
            'capacity' => $r->capacity,
            'active' => $r->active,
        ]);

        return inertia('Admin/Rooms', [
            'rooms' => $rooms,
            'locations' => $tenant->locations()->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateRoom($request);
        Room::create($data + ['sort' => 90]);

        return back()->with('success', 'Room added.');
    }

    public function update(Request $request, Room $room)
    {
        $room->update($this->validateRoom($request, forUpdate: true));

        return back()->with('success', 'Room saved.');
    }

    protected function validateRoom(Request $request, bool $forUpdate = false): array
    {
        return $request->validate([
            'name' => ($forUpdate ? 'sometimes' : 'required').'|string|max:60',
            'location_id' => ($forUpdate ? 'sometimes' : 'required').'|uuid',
            'room_type' => ($forUpdate ? 'sometimes' : 'required').'|in:single,couples,facial,wet',
            'capacity' => 'sometimes|integer|min:1|max:4',
            'active' => 'sometimes|boolean',
        ]);
    }
}
