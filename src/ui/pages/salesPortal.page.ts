import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/environment";

export abstract class SalesPortalPage {
  baseURL: string;
  spinner: Locator;
  notification: Locator;
  abstract uniqueElement: Locator;

  constructor(protected page: Page) {
    this.baseURL = SALES_PORTAL_URL;
    this.spinner = this.page.locator(".spinner-border");
    this.notification = this.page.locator(".toast-body");
  }

  async openSalesPortalPage () {
    await this.page.goto(this.baseURL);
  }

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0, {timeout:3000});
  }

  async waitForNotification(text: string, p0: void) {
    await expect(this.notification.last()).toHaveText(text);
  }
}
