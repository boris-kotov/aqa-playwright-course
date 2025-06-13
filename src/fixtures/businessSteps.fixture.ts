import { test as base } from "./pages.fixture";

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ signInPage, homePage }, use) => {
    await use(async () => {
      await signInPage.openSalesPortalPage();
      await signInPage.fillCredentials();
      await signInPage.clickOnLoginButton();
      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
