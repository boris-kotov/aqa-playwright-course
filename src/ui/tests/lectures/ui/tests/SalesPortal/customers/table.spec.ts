import { test, expect } from "fixtures/businessSteps.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check created customer in table", async ({ loginAsLocalUser, homePage, customersPage, addNewCustomerPage }) => {
    await loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    // Action
    await customersPage.waitForOpened();
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    // Assert

    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));

    await customersPage.clickDeleteCustomer(data.email);
  });

  test("Should check filtered by country table data", async ({ homePage, customersPage, loginAsLocalUser }) => {
    loginAsLocalUser();

    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();

    await customersPage.clickFilter();
    await customersPage.filterModal.waitForOpened();
    const countriesToCheck = ["USA", "Belarus", "Germany"];
    await customersPage.filterModal.checkFilters(...countriesToCheck);
    await customersPage.filterModal.clickApply();
    await customersPage.filterModal.waitForClosed();
    await customersPage.waitForOpened();

    const actualTableData = await customersPage.getTableData();
    expect(
      actualTableData.every((row) => countriesToCheck.includes(row.country)),
      `Expect table to contain only countries from ${countriesToCheck.join(", ")}`
    ).toBe(true);
  });

  test("[HW-22] Should check deleted customer in table", async ({ loginAsLocalUser, homePage, customersPage, addNewCustomerPage }) => {
    loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));

    await customersPage.clickDeleteCustomer(data.email);
    await customersPage.deleteModal.waitForOpened();

    await customersPage.deleteModal.confirmDelete();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);

    expect(actualCustomerData).not.toEqual(_.pick(data, ["email", "name"]));
  });
});
