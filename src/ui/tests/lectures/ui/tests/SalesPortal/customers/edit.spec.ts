import { test, expect } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Cuctomers] [Edit]", async ()=> {
    test("Should edit customer with smoke data", async ({loginAsLocalUser, homePage, customersPage, editCustomersPage}) =>{
        loginAsLocalUser();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickTableAction("uesr001@gmail.com	", "edit");
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

        const error = await editCustomersPage.getFormErrors();


    })
})