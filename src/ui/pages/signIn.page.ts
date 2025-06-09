import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
  emailInput = this.page.locator("#emailinput");
  passwordInput = this.page.locator("#passwordinput");
  loginButton = this.page.getByRole("button", { name: "Login" });

  user = this.page.locator("strong");
  uniqueElement = this.user;

  async fillCredentials() {
    await this.emailInput.fill(USER_LOGIN);
    await this.passwordInput.fill(USER_PASSWORD);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }

  async loginToSalesPortal () {
    await this.fillCredentials();
    await this.clickOnLoginButton();
  }
}
