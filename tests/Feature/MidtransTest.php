<?php

use App\Models\Client;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Http;

const MT_KEY = 'SB-Mid-server-TESTKEY';

beforeEach(function () {
    $this->setUpFixture();
    config(['services.midtrans.server_key' => MT_KEY, 'services.midtrans.production' => false]);

    $this->booking = $this->book($this->massage60, $this->day, '10:00', [$this->made], $this->singleRoom);
    $client = Client::create(['id' => $this->uid(), 'tenant_id' => $this->tenant->id, 'name' => 'Ayu', 'phone_e164' => '+6281234567890', 'email' => 'ayu@example.test']);
    $this->booking->forceFill(['status' => 'held', 'deposit_due' => 30000, 'deposit_paid' => 0, 'client_id' => $client->id])->save();
    $this->payments = app(PaymentService::class);
    $this->payment = $this->payments->createForBooking($this->booking, 'deposit', 'qris');

    $this->notification = fn (array $over = []) => array_merge([
        'order_id' => $this->payment->idempotency_key, 'status_code' => '200', 'gross_amount' => '30000.00',
        'transaction_status' => 'settlement', 'transaction_id' => 'mt-tx-1', 'fraud_status' => 'accept',
    ], $over);
    $this->signed = function (array $n) {
        $n['signature_key'] = hash('sha512', $n['order_id'].$n['status_code'].$n['gross_amount'].MT_KEY);

        return $n;
    };
    $this->url = 'http://'.$this->tenant->slug.'.localhost/webhooks/midtrans';
});

test('starting an IDR payment creates a Snap transaction with the payment key as order id', function () {
    Http::fake(['app.sandbox.midtrans.com/*' => Http::response(['token' => 'tok', 'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v4/redirection/tok'], 201)]);

    $out = $this->payments->gatewayFor('IDR')->start($this->payment);

    expect($out['redirect'])->toContain('snap/v4/redirection/tok');
    Http::assertSent(fn ($r) => $r->url() === 'https://app.sandbox.midtrans.com/snap/v1/transactions'
        && $r->hasHeader('Authorization', 'Basic '.base64_encode(MT_KEY.':'))
        && $r['transaction_details']['order_id'] === $this->payment->idempotency_key
        && $r['transaction_details']['gross_amount'] === 30000);
    expect($this->payment->fresh()->meta['snap_token'])->toBe('tok');
});

test('a provider refusal surfaces as an exception, not a silent redirect', function () {
    Http::fake(['app.sandbox.midtrans.com/*' => Http::response(['error_messages' => ['Access denied']], 401)]);

    expect(fn () => $this->payments->gatewayFor('IDR')->start($this->payment))->toThrow(RuntimeException::class, 'Access denied');
});

test('USD tenants and unconfigured installs keep the built-in sandbox gateway', function () {
    expect($this->payments->gatewayFor('USD'))->toBeInstanceOf(App\Support\Gateway\LulurPayGateway::class);
    config(['services.midtrans.server_key' => null]);
    expect($this->payments->gatewayFor('IDR'))->toBeInstanceOf(App\Support\Gateway\LulurPayGateway::class);
});

test('a webhook with a bad signature is rejected and changes nothing', function () {
    $n = ($this->notification)();
    $n['signature_key'] = 'forged';

    $this->postJson($this->url, $n)->assertForbidden();

    expect($this->payment->fresh()->status)->toBe('pending')
        ->and($this->booking->fresh()->status)->toBe('held');
});

test('a signed settlement confirms the booking once; a replay changes nothing', function () {
    $n = ($this->signed)(($this->notification)());

    $this->postJson($this->url, $n)->assertOk()->assertJson(['result' => 'paid']);
    $this->postJson($this->url, $n)->assertOk();

    $booking = $this->booking->fresh();
    expect($booking->status)->toBe('confirmed')
        ->and($booking->deposit_paid)->toBe(30000)
        ->and($this->payment->fresh()->provider_ref)->toBe('mt-tx-1');
});

test('the webhook works on a host that is not a tenant subdomain', function () {
    $n = ($this->signed)(($this->notification)());

    $this->postJson('http://pay.example.test/webhooks/midtrans', $n)->assertOk();

    expect($this->booking->fresh()->status)->toBe('confirmed');
});

test('a signed notification whose amount differs from the payment is refused', function () {
    $n = ($this->signed)(($this->notification)(['gross_amount' => '1.00']));

    $this->postJson($this->url, $n)->assertOk()->assertJson(['result' => 'amount_mismatch']);

    expect($this->booking->fresh()->status)->toBe('held');
});

test('pending stays pending and an expired transaction marks the payment failed', function () {
    $this->postJson($this->url, ($this->signed)(($this->notification)(['transaction_status' => 'pending', 'status_code' => '201'])))
        ->assertOk()->assertJson(['result' => 'pending']);
    expect($this->payment->fresh()->status)->toBe('pending');

    $this->postJson($this->url, ($this->signed)(($this->notification)(['transaction_status' => 'expire', 'status_code' => '407'])))
        ->assertOk()->assertJson(['result' => 'failed']);
    expect($this->payment->fresh()->status)->toBe('failed')
        ->and($this->booking->fresh()->status)->toBe('held');
});

test('returning from Midtrans pulls the status, so a local install confirms without a public webhook', function () {
    Http::fake(['api.sandbox.midtrans.com/*' => Http::response(($this->notification)())]);

    $this->get('http://'.$this->tenant->slug.'.localhost/pay/return/'.$this->payment->id)
        ->assertRedirect();

    expect($this->booking->fresh()->status)->toBe('confirmed');
    Http::assertSent(fn ($r) => str_contains($r->url(), '/v2/'.$this->payment->idempotency_key.'/status'));
});

test('returning without a completed payment goes back to checkout', function () {
    Http::fake(['api.sandbox.midtrans.com/*' => Http::response(($this->notification)(['transaction_status' => 'pending', 'status_code' => '201']))]);

    $this->get('http://'.$this->tenant->slug.'.localhost/pay/return/'.$this->payment->id)
        ->assertRedirectContains('/checkout');

    expect($this->booking->fresh()->status)->toBe('held');
});
