// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя ваши учетные данные
//  - Создать покупателя (модуль Customers)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)

import { test, expect } from "fixtures/businessSteps.fixture";
import { SALES_PORTAL_URL } from "config/environment";
import { COUNTRIES } from "data/customers/countries.data";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";


test.describe("[e2e] [UI] [Sales Portal] [Customers]", async () => {
  test("Should add new customer and verify", async ({ page, loginAsLocalUser, homePage, customersPage, addNewCustomerPage }) => {
   
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
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    expect(data).toMatchObject(await customersPage.getCustomerData(data.email));
  });
});
