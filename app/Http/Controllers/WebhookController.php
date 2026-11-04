<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Services\PaymentService;
use Illuminate\Http\Request;

/** Provider webhooks. Both payment providers carry our idempotency_key. */
class WebhookController extends Controller
{
    public function __construct(protected PaymentService $payments)
    {
    }

    public function stripe(Request $request)
    {
        $payload = $request->json()->all();
        if (($payload['type'] ?? null) === 'payment_intent.succeeded') {
            $key = $payload['data']['object']['metadata']['idempotency_key'] ?? null;
            if ($key) {
                $this->payments->markSucceeded($key, $payload['data']['object']['id'] ?? null);
            }
        }

        return response()->json(['received' => true]);
    }

    /** Midtrans HTTP notification: verified by signature_key, amount cross-checked, idempotent. */
    public function midtrans(Request $request)
    {
        $gateway = $this->payments->midtrans();
        $payload = $request->json()->all();

        if (! $gateway || ! $gateway->validSignature($payload)) {
            return response()->json(['error' => 'invalid signature'], 403);
        }

        $result = $this->payments->applyMidtransNotification($payload);

        return response()->json(['received' => true, 'result' => $result], $result === 'unknown_order' ? 404 : 200);
    }

    /** WhatsApp Cloud API inbound. STOP stops reminders for that number. */
    public function whatsapp(Request $request)
    {
        $entry = $request->json('entry.0.changes.0.value.messages.0');
        if ($entry && strtoupper(trim($entry['text']['body'] ?? '')) === 'STOP') {
            // Cloud API sends the number without '+'; phone_e164 is stored with it.
            Client::withoutGlobalScopes()
                ->whereRaw("ltrim(phone_e164, '+') = ?", [ltrim((string) $entry['from'], '+')])
                ->update(['whatsapp_stopped_at' => now(), 'marketing_consent' => false]);
        }

        return response()->json(['received' => true]);
    }
}
