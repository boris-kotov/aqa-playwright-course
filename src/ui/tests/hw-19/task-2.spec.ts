// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
//  - дождаться исчезновения спиннеров
//  - проверить действительно ли пользователь с логином Anatoly вошел в систему
//  - Проверить скриншотом боковое навигационное меню с выбранной страницей Home

import test, { expect } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/environment";

test.describe("[UI] Verify user login", () => {
  const userData = {
    username: "test@gmail.com",
    password: "12345678",
  };

  test("Verify user logged in", async ({ page }) => {
    await page.goto(SALES_PORTAL_URL);
    await page.locator("#emailinput").fill(userData.username);
    await page.locator("#passwordinput").fill(userData.password);
    await page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(page.locator(".spinner-border")).toHaveCount(0, {timeout: 20000});
    await expect(page.locator("strong")).toHaveText("Anatoly");
    await expect(page.locator("#sidebar")).toHaveScreenshot("sidebar.png");
  });
});
