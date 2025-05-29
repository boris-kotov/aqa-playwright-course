import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { COUNTRIES } from "data/customers/countries.data";

export class CustomersPage extends SalesPortalPage {
  private readonly addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });

  readonly filterButton = this.page.getByRole("button", { name: "Filter" });

  readonly tableHeader = this.page.locator("#table-customers th div");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) =>
    this.tableRow.filter({ has: this.page.getByText(email) });

  readonly emailCell = (email: string) =>
    this.tableRowByEmail(email).locator("td").nth(1);
  readonly nameCell = (email: string) =>
    this.tableRowByEmail(email).locator("td").nth(2);
  readonly countryCell = (email: string) =>
    this.tableRowByEmail(email).locator("td").nth(3);
  readonly createdOnCell = (email: string) =>
    this.tableRowByEmail(email).locator("td").nth(4);
  readonly editButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Delete");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(customerEmail: string) {
    const [email, name, country, createOn] = await this.tableRowByEmail(
      customerEmail
    )
      .locator("td")
      .allInnerTexts();
    return {
      email,
      name,
      country: country as COUNTRIES,
      // createOn,
    };
  }
}
