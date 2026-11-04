import { test, expect } from '@playwright/test'

// Choosing a day reloads its slots (and clears any chosen time), so wait for that response before picking a slot.
async function pickDay(page, index) {
    await Promise.all([
        page.waitForResponse((r) => r.url().includes('/availability?')),
        page.locator('.days [role=radio]:not([aria-disabled=true])').nth(index).click(),
    ])
    await page.waitForSelector('button.sl')
}

const phone = (testInfo) => testInfo.project.name === 'phone'

test('couples booking: treatment, time, details, consent, deposit, confirmation', async ({ page }, testInfo) => {
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))

    await page.goto('/')
    await page.getByRole('button', { name: 'For two' }).click()
    await expect(page.locator('.svc')).toHaveCount(1)
    await page.getByRole('button', { name: /Add/ }).first().click()
    await page.getByRole('button', { name: /Choose a time/ }).last().click()

    // pick a future day (3rd open day) and its first slot; the spa's "today" may already be over
    await page.waitForSelector('button.sl')
    await pickDay(page, 3)
    await page.locator('button.sl').nth(2).click()
    await page.getByRole('button', { name: 'Continue' }).last().click()

    await expect(page.getByText(/hold expires in (9|10) min/)).toBeVisible()
    await page.getByPlaceholder('Your name').fill('Emma Saputra')
    await page.getByPlaceholder('+44 7700 900 418').fill('+447700900418')
    await page.getByPlaceholder('you@example.com').fill('emma@example.test')
    for (const i of [0, 1]) {
        await page.getByRole('tab').nth(i).click()
        // answer every health question "No" (first button of each segmented control)
        await page.evaluate(() => document.querySelectorAll('.health .q .seg button:first-child').forEach((b) => b.click()))
    }
    await page.getByRole('tab').nth(0).click() // the booker signs; the second guest signs later from the link
    const pad = page.locator('.sig svg') // the pad is re-created per guest tab
    await expect(page.getByText('Sign here · Emma Saputra')).toBeVisible()
    await pad.scrollIntoViewIfNeeded()
    const box = await pad.boundingBox()
    await page.mouse.move(box.x + 40, box.y + 30)
    await page.mouse.down()
    await page.mouse.move(box.x + 120, box.y + 10, { steps: 6 })
    await page.mouse.move(box.x + 200, box.y + 40, { steps: 6 })
    await page.mouse.up()
    await page.getByText('I agree to the cancellation policy').click()
    await page.getByRole('button', { name: /Pay deposit/ }).last().click()

    await expect(page.getByText('Lulur Pay')).toBeVisible() // sandbox gateway page
    await page.getByRole('button', { name: /^Pay Rp/ }).click()

    await expect(page.getByText(/You're booked/).first()).toBeVisible()
    await expect(page.getByText('Teratai Suite').first()).toBeVisible()
    await expect(page.getByText(/Couples Ritual · 120 min/)).toBeVisible() // duration regression
    // the details sent at checkout were stored (regression: pay used to race ahead of the details request)
    await expect(page.getByText('Emma Saputra').first()).toBeVisible()
    await expect(page.getByText('Sign the consent form')).toHaveCount(0) // the booker's signature was stored
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false)
    expect(errors).toEqual([])
})

test('party size decides what is offered; category row is one line', async ({ page }) => {
    await page.goto('/')
    const solo = await page.locator('.svc .sn').allInnerTexts()
    expect(solo).not.toContain('Couples Ritual')
    expect(solo.length).toBeGreaterThan(2)

    const rows = await page.evaluate(() => new Set([...document.querySelectorAll('.cats .chip')].map((c) => c.offsetTop)).size)
    expect(rows).toBe(1)

    await page.getByRole('button', { name: 'For two' }).click()
    await expect(page.locator('.svc .sn')).toHaveText(['Couples Ritual'])
})

test('a second hold on the same slot is not offered again', async ({ browser }) => {
    // two visitors: the slot one of them holds disappears for the other
    const pick = async (ctx) => {
        const p = await ctx.newPage()
        await p.goto('/')
        await p.getByRole('button', { name: 'For two' }).click()
        await p.getByRole('button', { name: /Add/ }).first().click()
        await p.getByRole('button', { name: /Choose a time/ }).last().click()
        await p.waitForSelector('button.sl')
        await pickDay(p, 5)
        return p
    }
    const a = await pick(await browser.newContext())
    const b = await pick(await browser.newContext())
    const label = await a.locator('button.sl').nth(4).innerText()
    await a.locator('button.sl').nth(4).click()
    await a.getByRole('button', { name: 'Continue' }).last().click()
    await expect(a).toHaveURL(/checkout/)

    // b reloads availability for the same day: the held slot (and its overlapping neighbours) are gone
    await pickDay(b, 4)
    await pickDay(b, 5)
    await expect(b.locator('button.sl', { hasText: new RegExp(`^${label}$`) })).toHaveCount(0)
})
