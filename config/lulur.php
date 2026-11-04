<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Tenant resolution
    |--------------------------------------------------------------------------
    | Public booking pages and the tenant admin live on {tenant} subdomains of
    | app_domain. Locally, hosts that are not a known subdomain (localhost,
    | 127.0.0.1) fall back to default_tenant so the demo is easy to open.
    */
    'app_domain' => env('LULUR_APP_DOMAIN', 'lulur.app'),
    'platform_host' => env('LULUR_PLATFORM_HOST', 'admin.lulur.app'),
    'default_tenant' => env('LULUR_DEFAULT_TENANT', 'tirta'),

    /*
    |--------------------------------------------------------------------------
    | Booking defaults
    |--------------------------------------------------------------------------
    */
    'hold_minutes' => (int) env('LULUR_HOLD_MINUTES', 10),
    'slot_step_minutes' => 15,
    'calendar_start' => '09:00',
    'calendar_end' => '21:00',
    'calendar_px_per_hour' => 78,

    /*
    |--------------------------------------------------------------------------
    | Payments
    |--------------------------------------------------------------------------
    | Gateways are selected per currency. In sandbox mode every gateway is the
    | simulated Lulur Pay page so the demo can run without provider keys.
    */
    'sandbox' => (bool) env('LULUR_PAYMENT_SANDBOX', true),
    'gateways' => [
        'USD' => env('LULUR_GATEWAY_USD', 'stripe'),
        'IDR' => env('LULUR_GATEWAY_IDR', 'midtrans'),
        'SGD' => env('LULUR_GATEWAY_SGD', 'stripe'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Forms
    |--------------------------------------------------------------------------
    */
    'form_validity_months' => 12,
];
