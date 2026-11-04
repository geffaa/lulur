import { test, expect } from '@playwright/test'

const login = (page, email) => page.goto(`/demo-login/${email}`)

test('front desk: calendar shows mixed statuses and opens the detail panel', async ({ page }) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    await login(page, 'owner@tirta.test')
    await page.goto('/admin/calendar')
    await expect(page.locator('.bk').first()).toBeVisible()

    // no clipped text inside any booking card
    const clipped = await page.evaluate(() => [...document.querySelectorAll('.bk')].filter((b) => {
        const r = b.getBoundingClientRect()
        return [...b.children].some((c) => !c.classList.contains('flag') && (c.getBoundingClientRect().right > r.right + 1))
    }).length)
    expect(clipped).toBe(0)

    // the date shown is the spa's date (Asia/Makassar), not UTC
    const tz = await page.evaluate(() => new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Makassar', weekday: 'long', month: 'short', day: 'numeric' }))
    await expect(page.getByText(tz.replace(',', ',')).first()).toBeVisible()

    await page.locator('.bk').first().click()
    await expect(page.locator('aside.panel')).toBeVisible()
    expect(errors).toEqual([])
})

test('team: add a shift and time off with the custom pickers', async ({ page }) => {
    await login(page, 'owner@tirta.test')
    await page.goto('/admin/team')
    await page.getByRole('combobox', { name: 'Therapist', exact: true }).click()
    await page.getByRole('option', { name: 'Made Artana' }).click()
    await page.getByRole('button', { name: 'Shift date' }).click()
    await page.locator('.dpick .dp-d:not(.out)').nth(14).click()
    await page.getByRole('combobox', { name: 'Shift start' }).click()
    await page.getByRole('option', { name: '10:00' }).click()
    await page.getByRole('button', { name: 'Add shift' }).click()
    await expect(page.getByText('Shift added', { exact: false })).toBeVisible()

    await page.getByRole('combobox', { name: 'Time off therapist' }).click()
    await page.getByRole('option', { name: 'Komang Sari' }).click()
    await page.getByRole('button', { name: 'Time off from date' }).click()
    await page.locator('.dpick .dp-d:not(.out)').nth(2).click()
    await page.getByRole('button', { name: 'Time off to date' }).click()
    await page.locator('.dpick .dp-d:not(.out)').nth(3).click()
    await page.getByRole('button', { name: 'Record time off' }).click()
    await expect(page.getByText('Time off recorded', { exact: false })).toBeVisible()
})

test('therapist login lands on /today', async ({ page }) => {
    await login(page, 'komang@tirta.test')
    await expect(page).toHaveURL(/\/today$/)
})

test('no native form controls on any page', async ({ page }) => {
    await login(page, 'owner@tirta.test')
    for (const url of ['/', '/admin/calendar', '/admin/bookings', '/admin/clients', '/admin/catalog', '/admin/team', '/admin/rooms', '/admin/settings', '/admin/reports', '/admin/marketing']) {
        await page.goto(url)
        await page.waitForLoadState('load')
        const native = await page.evaluate(() => document.querySelectorAll('select, input[type=date], input[type=time], input[type=datetime-local], input[type=checkbox], input[type=radio]').length)
        expect(native, url).toBe(0)
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), `${url} horizontal scroll`).toBe(false)
    }
})

test('each tenant has its own mark and palette, and the platform mark keeps its own colour', async ({ page }) => {
    const expected = { tirta: '#1e6f8c', juniper: '#3f6b4a', rona: '#7a4b8c' }
    for (const [slug, brand] of Object.entries(expected)) {
        await page.goto(`http://${slug}.localhost:8011/`)
        await expect(page.locator('.blogo .tmark svg')).toBeVisible() // a drawn mark, not a letter
        expect((await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--brand').trim())).toLowerCase()).toBe(brand)
        // the Lulur footer mark must not take the tenant colour
        expect(await page.locator('.bfoot svg path').last().getAttribute('fill')).toBe('#8C3B4A')
    }
})

test('the booking header stays on one line for the longest tenant name at phone width', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'phone')
    await page.goto('http://rona.localhost:8011/')
    const h = await page.evaluate(() => document.querySelector('.bhdr .w').getBoundingClientRect().height)
    expect(h).toBeLessThanOrEqual(70)
})
