// import test, { expect } from "@playwright/test";
import {test, expect} from "fixtures/businessSteps.fixture"
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check created customer in table", async ({ homePage, customersPage, addNewCustomerPage, signInPage }) => {
    // Precondition
    await signInPage.openSalesPortalPage();
    await signInPage.fillCredentials();
    await signInPage.clickOnLoginButton();

    await homePage.waitForOpened();
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

    // await expect.soft(customersPage.emailCell(data.email)).toHaveText(data.email);
    // await expect.soft(customersPage.nameCell(data.email)).toHaveText(data.name);
    // await expect.soft(customersPage.countryCell(data.email)).toHaveText(data.country);

    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));

    await customersPage.clickDeleteCustomer(data.email);
  });

  test("Should check filtered by country table data", async ({ homePage, customersPage, loginAsLocalUser }) => {

    // await signInPage.openSalesPortalPage();
    // await signInPage.fillCredentials();
    // await signInPage.clickOnLoginButton();

    // await homePage.waitForOpened();

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

// test("Should check created customer in table", async ({ pages }) => {
//     // Precondition
//     await pages.signInPage.openSalesPortalPage();
//     await pages.signInPage.fillCredentials();
//     await pages.signInPage.clickOnLoginButton();

//     await pages.homePage.waitForOpened();
//     await pages.homePage.clickModuleButton("Customers");
//     await pages.customersPage.waitForOpened();
//     await pages.customersPage.clickAddNewCustomer();
//     await pages.addNewCustomerPage.waitForOpened();
//     const data = generateCustomerData();
//     await pages.addNewCustomerPage.fillInputs(data);
//     await pages.addNewCustomerPage.clickSaveNewCustomer();
//     await pages.customersPage.waitForOpened();
//     await pages.customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

//     // Action
//     await pages.customersPage.waitForOpened();
//     await expect(pages.customersPage.tableRowByEmail(data.email)).toBeVisible();

//     // Assert

//     // await expect.soft(customersPage.emailCell(data.email)).toHaveText(data.email);
//     // await expect.soft(customersPage.nameCell(data.email)).toHaveText(data.name);
//     // await expect.soft(customersPage.countryCell(data.email)).toHaveText(data.country);

//     const actualCustomerData = await pages.customersPage.getCustomerData(data.email);
//     expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));

//     await pages.customersPage.clickDeleteCustomer(data.email);
//   });

//   test("Should check filtered by country table data", async ({ pages }) => {

//     await pages.signInPage.openSalesPortalPage();
//     await pages.signInPage.fillCredentials();
//     await pages.signInPage.clickOnLoginButton();

//     await pages.homePage.waitForOpened();
//     await pages.homePage.clickModuleButton("Customers");
//     await pages.customersPage.waitForOpened();

//     await pages.customersPage.clickFilter();
//     await pages.customersPage.filterModal.waitForOpened();
//     const countriesToCheck = ["USA", "Belarus", "Germany"];
//     await pages.customersPage.filterModal.checkFilters(...countriesToCheck);
//     await pages.customersPage.filterModal.clickApply();
//     await pages.customersPage.filterModal.waitForClosed();
//     await pages.customersPage.waitForOpened();

//     const actualTableData = await pages.customersPage.getTableData();
//     expect(
//       actualTableData.every((row) => countriesToCheck.includes(row.country)),
//       `Expect table to contain only countries from ${countriesToCheck.join(", ")}`
//     ).toBe(true);
//   });
});
