<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>TeacherOn</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel='stylesheet' />
        <link href='{{ asset('assets/boxicons-2.1.4/css/boxicons.min.css') }}' as="style" rel="preload" onload="this.rel='stylesheet'">
        @routes
        @vitereactrefresh
        @vite(['resources/js/app.jsx', 'resources/css/app.css'])
        @inertiaHead

    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
