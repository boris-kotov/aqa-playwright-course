import { expect } from "@playwright/test";
import { Modal } from "../modal.page";

export class DeleteModal extends Modal {
  uniqueElement = this.page.locator(".modal-content");

  readonly title = this.uniqueElement.locator(".modal-title");
  readonly confirmButton = this.uniqueElement.getByRole("button", { name: "Yes, Delete" });
  readonly cancelButton = this.uniqueElement.getByRole("button", { name: "Cancel" });
  readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');

  async confirmDelete() {
    await this.confirmButton.click();
  }

  async cancelDelete() {
    await this.cancelButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
