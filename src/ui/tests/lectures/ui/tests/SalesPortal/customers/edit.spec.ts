import { test, expect } from "fixtures/businessSteps.fixture";
import _ from "lodash";

test.describe("[UI] [Cuctomers] [Edit]", async ()=> {
    test("Should edit customer with smoke data", async ({page, loginAsLocalUser, homePage, customersPage, editCustomersPage}) =>{
        loginAsLocalUser();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        const firstUserEmail = await page.locator("tbody tr:nth-child(1) td:nth-child(1)").innerText()
        await customersPage.clickTableAction(firstUserEmail, "edit");
        await editCustomersPage.waitForOpened();
        await editCustomersPage.fillInputs({
            email: "a#%@!!",
            city: "!@#!",
            flat: 11111111231231313131,
            house: 12314124141414141,
            name: "1231314123414124141414",
            notes: "<>",
            phone: "  ",
            street: "12$#@!$",
        })

        const errors = await editCustomersPage.getFormErrors();
        console.log(errors);

    })
})