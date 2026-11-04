<?php

// Router for `php -S` in the e2e run: serve real files from public/, everything else through Laravel.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path !== '/' && is_file(__DIR__.'/../public'.$path)) {
    return false;
}
require __DIR__.'/../public/index.php';
