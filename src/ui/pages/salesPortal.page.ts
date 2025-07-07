import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/environment";

export abstract class SalesPortalPage {
  portalURL: string;
  spinner: Locator;
  notification: Locator;
  abstract uniqueElement: Locator;

  constructor(protected page: Page) {
    this.portalURL = SALES_PORTAL_URL;
    this.spinner = this.page.locator(".spinner-border");
    this.notification = this.page.locator(".toast-body");
  }

  async openSalesPortalPage() {
    await this.page.goto(this.portalURL);
  }

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 3000 });
    await this.waitForSpinner();
  }

  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0, { timeout: 3000 });
  }

  async waitForNotification(text: string, p0: void) {
    await expect(this.notification.last()).toHaveText(text);
  }
}
