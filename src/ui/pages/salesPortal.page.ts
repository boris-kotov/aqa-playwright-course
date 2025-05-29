import { expect, Locator, Page } from "@playwright/test";
import { Url } from "url";

export abstract class SalesPortalPage {
  baseURL: string;
  spinner: Locator;
  notification: Locator;
  abstract uniqueElement: Locator;

  constructor(protected page: Page) {
    this.baseURL = "https://anatoly-karpovich.github.io/aqa-course-project/#";
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
    await expect(this.spinner).toHaveCount(0);
  }

  async waitForNotification(text: string) {
    await expect(this.notification.last()).toHaveText(text);
  }
}
