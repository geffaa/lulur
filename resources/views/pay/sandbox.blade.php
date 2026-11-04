<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lulur Pay · sandbox</title>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Literata:opsz,wght@7..72,600&display=swap" rel="stylesheet">
<style>
:root{--brand:#8C3B4A;--brand-strong:#722E3B;--ground:#F5F3F4;--surface:#fff;--line:#E7E2E4;--text:#1E1A1C;--text-3:#625A5E}
*{box-sizing:border-box;margin:0}
body{background:var(--ground);color:var(--text);font:15px/1.5 "Hanken Grotesk",system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;padding:20px}
.card{background:var(--surface);border-radius:16px;box-shadow:0 1px 2px rgba(30,26,28,.04),0 4px 16px -6px rgba(30,26,28,.10);padding:28px;max-width:400px;width:100%}
.mark{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.mark i{width:40px;height:40px;border-radius:10px;background:var(--brand);color:#fff;display:grid;place-items:center;font:600 18px Literata,serif;font-style:normal}
.mark b{font:600 19px Literata,serif}
.badge{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;font-size:12px;font-weight:600;background:#FBF3F5;color:#722E3B;margin-left:auto}
.amount{font:600 34px/1.2 "Hanken Grotesk";letter-spacing:-.02em;margin:6px 0 2px;font-variant-numeric:tabular-nums}
.muted{color:var(--text-3);font-size:13px}
.kv{display:grid;grid-template-columns:110px 1fr;gap:8px;margin:20px 0;padding:14px;border:1px solid var(--line);border-radius:10px;font-size:13.5px}
.kv span{color:var(--text-3)}
.qr{width:150px;height:150px;margin:8px auto 4px;background:
  repeating-conic-gradient(#1E1A1C 0 25%, #fff 0 50%) 0 0/22px 22px;border:6px solid #fff;outline:1px solid var(--line);border-radius:6px}
.actions{display:grid;gap:8px;margin-top:18px}
button{height:46px;border-radius:8px;border:0;font:600 14px "Hanken Grotesk";cursor:pointer}
.pay{background:var(--brand);color:#fff}
.pay:hover{background:var(--brand-strong)}
.no{background:none;color:var(--text-3)}
small{display:block;text-align:center;color:var(--text-3);margin-top:14px;font-size:12px}
</style>
</head>
<body>
<div class="card">
  <div class="mark"><i>{{ $tenant->branding['logo_letter'] ?? 'L' }}</i><b>Lulur Pay</b><span class="badge">Sandbox</span></div>
  <div class="amount">{{ $amount }}</div>
  <div class="muted">{{ $booking->tenant->name }} · booking {{ $booking->code }}</div>
  <div class="kv">
    <span>Method</span><b style="text-transform:uppercase">{{ $method }}</b>
    <span>Description</span><b>{{ $booking->items->first()?->service->name }}</b>
    @if($method === 'qris')
    <span>QRIS</span><span>Scan with any Indonesian bank or e-wallet app</span>
    @else
    <span>Card</span><span>Visa ·· 4242 (sandbox card)</span>
    @endif
  </div>
  @if($method === 'qris')<div class="qr" aria-hidden="true"></div>@endif
  <div class="actions">
    <form method="post" action="{{ route('pay.approve', $payment->id) }}">
      @csrf
      <button class="pay">Pay {{ $amount }}</button>
    </form>
    <form method="post" action="{{ route('pay.decline', $payment->id) }}">
      @csrf
      <button class="no">Cancel payment</button>
    </form>
  </div>
  <small>Simulated gateway. In production this is Stripe (USD) or Midtrans/Xendit (IDR); the webhook contract is the same.</small>
</div>
</body>
</html>
