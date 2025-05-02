import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] Authentication", () => {
  test.beforeEach(async ({ page }) => {
    const loginLink = page.locator('[href="/login"]');
    await page.goto("https://the-internet.herokuapp.com/");
    await loginLink.click();
  });

  test("Should authenticate with valid credentials", async ({ page }) => {
    // precondition
    const validCredentials = {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    };

    const loginForm = page.locator("#username");
    const passwordForm = page.locator("#password");
    const loginButton = page.locator("button.radius");

    // action

    await loginForm.fill(validCredentials.username);
    await passwordForm.fill(validCredentials.password);
    await loginButton.click();

    // assertion
    const successNotification = page.locator("div[data-alert]");
    await expect(successNotification).toContainText(
      "You logged into a secure area!"
    );
  });

  test("Should check secure page", async ({ page }) => {
    // precondition
    const validCredentials = {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    };

    const loginForm = page.locator("#username");
    const passwordForm = page.locator("#password");
    const loginButton = page.locator("button.radius");

    await loginForm.fill(validCredentials.username);
    await passwordForm.fill(validCredentials.password);
    await loginButton.click();

    const notification = page.locator("div[data-alert]");
    const pageTitle = page.locator("h2");
    const subheader = page.locator("h4.subheader");
    const logoutButton = page.locator("a[href='/logout']");

    await expect(notification).toHaveText(" You logged into a secure area!\n×");
    await expect(pageTitle).toHaveText("Secure Area");
    await expect(subheader).toHaveText(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    await expect(logoutButton).toHaveText("Logout");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Should not authenticate with invalid username", async ({ page }) => {
    const loginForm = page.locator("#username");
    const passwordForm = page.locator("#password");
    const loginButton = page.locator("button.radius");
    const validCredentials = {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    };
    const notification = page.locator("div[data-alert]");

    await loginForm.fill(validCredentials.username + "123");
    await passwordForm.fill(validCredentials.password);
    await loginButton.click();

    await expect(notification).toHaveText(" Your username is invalid!\n×");
  });

  test("Should not authenticate with invalid password", async ({ page }) => {
    const loginForm = page.locator("#username");
    const passwordForm = page.locator("#password");
    const loginButton = page.locator("button.radius");
    const validCredentials = {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    };
    const notification = page.locator("div[data-alert]");

    await loginForm.fill(validCredentials.username);
    await passwordForm.fill(validCredentials.password + 'sdfsdf');
    await loginButton.click();

    await expect(notification).toHaveText(" Your password is invalid!\n×");
  });

});
