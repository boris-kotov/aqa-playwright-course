import { test as base } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { SideMenuComponent } from "ui/pages/side-menu.page";

interface ISalesPortalPages {
  homePage: HomePage;
  addNewCustomerPage: AddNewCustomerPage;
  customersPage: CustomersPage;
  signInPage: SignInPage;
  editCustomersPage: EditCustomerPage;
  sideMenu: SideMenuComponent;
}

export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  editCustomersPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },

  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
});

// interface ISalesPortalPages {
//   pages: Pages;
// }

// export const test = base.extend<ISalesPortalPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect } from "@playwright/test";
