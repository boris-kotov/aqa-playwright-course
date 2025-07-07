import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "types/singnIn.types";

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  uniqueElement = this.loginButton;
  // user = this.page.locator("strong");
  // uniqueElement = this.user;

  async fillCredentials({email, password}: ICredentials) {
    email && await this.emailInput.fill(email);
    password && await this.passwordInput.fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}
