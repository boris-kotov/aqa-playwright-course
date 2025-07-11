import { test, expect } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Customers] [Search]", async () => {
  test("Should search for existing customer by email", async ({ loginAsLocalUser, homePage, customersPage }) => {
    await loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    const expected = {
      email: "test1750006741873@gmail.com",
      name: "Test jPPntfMoJyjaGpKnINUspestnwcduIzmgkA",
      country: "USA",
    };
    await customersPage.search(expected.email);
    await expect.soft(customersPage.tableRow).toHaveCount(1);
    const actual = await customersPage.getCustomerData(expected.email);
    expect.soft(actual).toMatchObject(expected);
    expect.soft(customersPage.searchChipButton).toHaveText(expected.email);
  });
});
