<?php

namespace App\Support;

/**
 * Named accent palettes for tenants. A tenant picks one with branding.palette; the booking pages
 * and admin then re-skin through the --brand-* CSS variables (Lulur's own default is rosewood).
 */
class BrandPalette
{
    public const PALETTES = [
        'rosewood' => ['brand' => '#8C3B4A', 'brand-strong' => '#722E3B', 'brand-soft' => '#F6E6E9', 'brand-tint' => '#FBF3F5', 'brand-border' => '#E9C9D0', 'brand-mid' => '#B5596A', 'brand-light' => '#E3B4BE'],
        'lagoon' => ['brand' => '#1E6F8C', 'brand-strong' => '#165770', 'brand-soft' => '#E1F0F5', 'brand-tint' => '#F1F8FA', 'brand-border' => '#BBD9E4', 'brand-mid' => '#4A93AE', 'brand-light' => '#A8CFDD'],
        'evergreen' => ['brand' => '#3F6B4A', 'brand-strong' => '#2F5239', 'brand-soft' => '#E3EEE5', 'brand-tint' => '#F2F7F3', 'brand-border' => '#C4D8C8', 'brand-mid' => '#6A9475', 'brand-light' => '#AFCBB6'],
        'plum' => ['brand' => '#7A4B8C', 'brand-strong' => '#5F3A6E', 'brand-soft' => '#EDE5F2', 'brand-tint' => '#F7F3FA', 'brand-border' => '#D6C6E1', 'brand-mid' => '#9B6FAD', 'brand-light' => '#CDB4D9'],
    ];

    /** CSS for :root, or '' for the default palette. */
    public static function css(?string $name): string
    {
        $p = self::PALETTES[$name ?? ''] ?? null;
        if (! $p || $name === 'rosewood') {
            return '';
        }
        $vars = collect($p)->map(fn ($v, $k) => "--{$k}:{$v}")->implode(';');

        return ":root{{$vars};--c-dep-bg:{$p['brand-tint']};--c-dep-bd:{$p['brand']};--c-dep-tx:{$p['brand-strong']}}";
    }
}
