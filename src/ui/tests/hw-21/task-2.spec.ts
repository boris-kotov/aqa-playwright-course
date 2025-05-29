// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя ваши учетные данные
//  - Создать покупателя (модуль Customers)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)

import test, { expect } from "@playwright/test";
import { COUNTRIES } from "data/customers/countries.data";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";

test.describe("[e2e] [UI] [Sales Portal] [Customers]", async () => {
  test("Should add new customer and verify", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await page.goto(process.env.BASE_URL!);
    await signInPage.loginToSalesPortal();
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData({ country: COUNTRIES.BELARUS });
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    expect(data).toMatchObject(await customersPage.getCustomerData(data.email));
  });
});
