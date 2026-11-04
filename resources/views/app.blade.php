<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title inertia>{{ config("app.name", "Lulur") }}</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="csrf-token" content="{{ csrf_token() }}">
@routes
@vite('resources/js/app.js')
@inertiaHead
</head>
<body class="@yield('bodyClass')">
@inertia
</body>
</html>
