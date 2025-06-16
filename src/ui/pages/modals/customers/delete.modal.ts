import { expect } from "@playwright/test";
import { Modal } from "../modal.page";

export class DeleteModal extends Modal {
  readonly modalContainer = this.page.locator('div[role="dialog"]');
  readonly deleteButton = this.modalContainer.getByRole("button", { name: "Yes, Delete" });
  readonly title = this.modalContainer.locator(".modal-title");
  readonly cancelButton = this.modalContainer.getByRole("button", { name: "Cancel" });
  readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');
  uniqueElement = this.deleteButton;

  async confirmDelete() {
    await this.deleteButton.click();
  }

  async cancelDelete() {
    await this.cancelButton.click();
  }

  async close() {
    await this.closeButton.click();
    await this.waitForClosed();
  }
}
