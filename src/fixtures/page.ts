import { Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";

export class Pages {
  public homePage: HomePage;
  public addNewCustomerPage: AddNewCustomerPage;
  public customersPage: CustomersPage;
  public signInPage: SignInPage;

  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.customersPage = new CustomersPage(page);
    this.signInPage = new SignInPage(page);
  }
}
