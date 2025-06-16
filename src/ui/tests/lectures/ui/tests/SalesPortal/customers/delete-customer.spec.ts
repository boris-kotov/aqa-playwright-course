import { COUNTRIES } from "data/customers/countries.data";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/notifications.data";
import { test, expect } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Cuctomers] [Delete]", async () => {
  test("Should delete customer on Edit Customer page", async ({ homePage, loginAsLocalUser, customersPage, addNewCustomerPage, editCustomersPage }) => {
    await loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData({ country: COUNTRIES.BELARUS });
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customersPage.clickTableAction(data.email, "edit");
    await editCustomersPage.waitForOpened();
    await editCustomersPage.clickDeleteCustomer();
    await editCustomersPage.deleteModal.waitForOpened();
    await editCustomersPage.deleteModal.confirmDelete();
    await editCustomersPage.deleteModal.waitForClosed();
    await editCustomersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
    await customersPage.search(data.email);
    await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
  });

  test("Should delete customer on Customers page", async ({ page, homePage, loginAsLocalUser, customersPage, addNewCustomerPage }) => {
    await loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData({ country: COUNTRIES.BELARUS });
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customersPage.clickTableAction(data.email, "delete");
    await customersPage.deleteModal.waitForOpened();
    await customersPage.deleteModal.confirmDelete();
    await customersPage.deleteModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect.soft(customersPage.tableRowByEmail(data.email)).not.toBeVisible(); 
    await customersPage.search(data.email);
    await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
  });
});
