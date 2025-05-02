import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] Dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.locator("[href='/dropdown']").click();
  });

  test("Should select dropdown option 1", async ({ page }) => {
    // action
    const dropdown = page.locator("select#dropdown");
    await dropdown.selectOption("Option 1");

    // assert
    await expect(dropdown).toHaveValue("1");
  });

  test("Should select dropdown option 2", async ({ page }) => {
    // action
    const dropdown = page.locator("select#dropdown");
    await dropdown.selectOption("2");

    // assert
    await expect(dropdown).toHaveValue("2");
  });
});
