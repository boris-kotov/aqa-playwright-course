import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { IUser } from "types/users.types";
import { users } from "data/users/user.data";

export class SignInPage extends SalesPortalPage {
    emailInput= this.page.locator("#emailinput");
    passwordInput= this.page.locator("#passwordinput");
    loginButton = this.page.getByRole("button", { name: "Login" });
    
    user = this.page.locator('strong');
    uniqueElement = this.user;

    async fillCredentials (){
        await this.emailInput.fill(users.email);
        await this.passwordInput.fill(users.password);
    }

    async clickOnLoginButton () {
        await this.loginButton.click()
    }
    
}