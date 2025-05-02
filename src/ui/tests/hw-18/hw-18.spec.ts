// Task 1.
//  Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
//   Требования:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы,
//       как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и
//       нижнем регистрах, пароль из одних пробелов запрещен

import test, { expect } from "@playwright/test";

test.describe("[UI] [Registration form] Registration form Smoke test", () => {
  const validCredentials = {
    username: "User001",
    password: "Password1",
  };
  const emptySpacesValidationMessage =
    "Prefix and postfix spaces are not allowed is username";
  const provideValidDataMessage = "Please, provide valid data";
  const requiredPasswordMessage = "Password is required";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    const registerButton = page.locator("#registerOnLogin");
    await registerButton.click();
  });

  test("Should register with valid input", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });

  test("Should go back to login after clicking Back button", async ({
    page,
  }) => {
    const backButton = page.locator("#backOnRegister");

    await backButton.click();
    await expect(page.locator("#loginForm")).toHaveText("Login");
  });

  test("Should not register with empty input", async ({ page }) => {
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(provideValidDataMessage);
  });

  test("Should not register with empty username", async ({ page }) => {
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await passwordInput.fill(validCredentials.password);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText("Username is required");
  });

  test("Should not register with empty password", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(requiredPasswordMessage);
  });

  test("Should not have less than 3 letters in username", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill("Pw");
    await passwordInput.fill(validCredentials.password);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(
      "Username should contain at least 3 characters"
    );
  });

  test("Should not register with prefix spaces in username", async ({
    page,
  }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(" user001");
    await passwordInput.fill(validCredentials.password);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(emptySpacesValidationMessage);
  });

  test("Should not register with postfix spaces in username", async ({
    page,
  }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill("user001 ");
    await passwordInput.fill(validCredentials.password);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(emptySpacesValidationMessage);
  });

  test("Should not have less than 8 letters in password", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill("Passwor");
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(
      "Password should contain at least 8 characters"
    );
  });

  test("Should not register with only capital letters in password", async ({
    page,
  }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill("PASSWORD");
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(
      "Password should contain at least one character in lower case"
    );
  });

  test("Should not register with only lower-case letters in password", async ({
    page,
  }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill("password");
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(
      "Password should contain at least one character in upper case"
    );
    // Failed. BUG: there is no validation for that case implemented
  });

  test("Should not register with only-spaces in password", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerSubmitButton = page.locator("#register");
    const registerMessage = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(`${" ".repeat(8)}`);
    await registerSubmitButton.click();
    await expect(registerMessage).toHaveText(requiredPasswordMessage);
  });

  test("Should not be possible to input more than 40 symbols in username", async ({
    page,
  }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    await expect(usernameInput).toHaveAttribute('maxlength', '40');
  });

  test("Should not be possible to input more than 20 symbols in password", async ({
    page,
  }) => {
    const passwordInput = page.locator("#passwordOnRegister");
    await expect(passwordInput).toHaveAttribute('maxlength', '20');
  });
});
