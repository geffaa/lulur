import { defineConfig, devices } from '@playwright/test'

// E2E runs against its own database (lulur_e2e) so the dev data is never touched.
const env = { ...process.env, APP_ENV: 'local', DB_DATABASE: 'lulur_e2e', CACHE_STORE: 'array', SESSION_DRIVER: 'file', QUEUE_CONNECTION: 'sync' }

export default defineConfig({
    testDir: './e2e',
    workers: 1, // tests share one seeded database and hold slots
    timeout: 60_000,
    reporter: [['list']],
    use: { baseURL: 'http://127.0.0.1:8011', trace: 'retain-on-failure' },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
        { name: 'phone', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
    ],
    webServer: {
        command: 'php artisan migrate:fresh --seed --force && php -S 127.0.0.1:8011 -t public e2e/router.php',
        url: 'http://127.0.0.1:8011',
        env,
        reuseExistingServer: false,
        timeout: 120_000,
    },
})
