import { ModuleName } from "types/home.types";
import { SalesPortalPage } from "./salesPortal.page";
import { Locator } from "@playwright/test";

export class HomePage extends SalesPortalPage {
  title = this.page.locator(".welcome-text");
  customersButton = this.page.getByRole("link", { name: "Customers" });
  productsButton = this.page.getByRole("link", { name: "Products" });
  ordersButton = this.page.getByRole("link", { name: "Orders" });

  uniqueElement = this.title;

  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }
}
