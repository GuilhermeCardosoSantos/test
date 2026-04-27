import { test, expect } from "@playwright/test"

test("login → visualiza grid de produtos", async ({ page }) => {
    // vai pra tela de login
    await page.goto("/auth/sign-in")

    // preenche login
    await page.fill('input[name="email"]', "dinamica")
    await page.fill('input[name="senha"]', "123")

    // envia
    await page.click('button[type="submit"]')

    // espera redirecionamento
    await page.waitForURL("**/produtos")

    // valida que chegou na página
    await expect(page).toHaveURL(/produtos/)

    // valida grid carregou
    await expect(page.locator("[data-testid='product-card']").first()).toBeVisible()

    const firstCard = page.locator("[data-testid='product-card']").first()
    await expect(firstCard).toBeVisible()

    await firstCard.locator("text=CONFIRA").click()

    await expect(page.locator("[data-testid='product-modal']")).toBeVisible()
})