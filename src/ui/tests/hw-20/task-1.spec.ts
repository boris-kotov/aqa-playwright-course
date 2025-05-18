// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect, Locator, Page } from "@playwright/test";

interface IRegistrationTestData {
  testName: string;
  username: string;
  password: string;
  message: string;
  maxLength?: boolean;
}

const registrationInvalidTestData: IRegistrationTestData[] = [
  {
    testName: "Should not register with empty input",
    username: "",
    password: "",
    message: "Please, provide valid data",
    maxLength: false,
  },
  {
    testName: "Should not register with empty username",
    username: "",
    password: "Password1",
    message: "Username is required",
    maxLength: false,
  },
  {
    testName: "Should not register with empty password",
    username: "User001",
    password: "",
    message: "Password is required",
    maxLength: false,
  },
  {
    testName: "Should not have less than 3 letters in username",
    username: "Pw",
    password: "Password1",
    message: "Username should contain at least 3 characters",
    maxLength: false,
  },
  {
    testName: "Should not register with prefix spaces in username",
    username: " User001",
    password: "Password",
    message: "Prefix and postfix spaces are not allowed in username",
    maxLength: false,
  },
  {
    testName: "Should not register with postfix spaces in username",
    username: "User001 ",
    password: "Password",
    message: "Prefix and postfix spaces are not allowed in username",
    maxLength: false,
  },
  {
    testName: "Should not have less than 8 letters in password",
    username: "User001",
    password: "Passwor",
    message: "Password should contain at least 8 characters",
    maxLength: false,
  },
  {
    testName: "Should not register with only capital letters in password",
    username: "User001",
    password: "PASSWORD",
    message: "Password should contain at least one character in lower case",
    maxLength: false,
  },
  // this check will fail:
  {
    testName: "Should not register with only lower-case letters in password",
    username: "User001",
    password: "password",
    message: "Password should contain at least one character in upper case",
    maxLength: false,
  },
  {
    testName: "Should not register with only-spaces in password",
    username: "User001",
    password: `${" ".repeat(8)}`,
    message: "Password is required",
    maxLength: false,
  },
  {
    testName:
      "Should not be possible to input more than 40 symbols in username",
    username: "User001User001User001User001User001User00",
    password: "Password",
    message: "Username can't exceed 40 characters",
    maxLength: true,
  },
  {
    testName:
      "Should not be possible to input more than 20 symbols in password",
    username: "User001",
    password: "PasswordPasswordPassw",
    message: "Password can't exceed 20 characters",
    maxLength: true,
  },
];

const startPage = "https://anatoly-karpovich.github.io/demo-login-form/";

async function openRegistrationPage(page: Page) {
  await page.goto(startPage);
  await page.locator("#registerOnLogin").click();
}

async function removeInputsMaxLength(
  page: Page,
  username: string,
  password: string,
  maxLength?: boolean
) {
  if (maxLength && username.length > 40) {
    await page.evaluate(() => {
      document
        .querySelector("#userNameOnRegister")
        ?.removeAttribute("maxlength");
    });
  }
  if (maxLength && password.length > 20) {
    await page.evaluate(() => {
      document
        .querySelector("#passwordOnRegister")
        ?.removeAttribute("maxlength");
    });
  }
}

async function fillCredentialsAndSubmit(
  form: Locator,
  username: string,
  password: string
) {
  await form.locator("#userNameOnRegister").fill(username);
  await form.locator("#passwordOnRegister").fill(password);

  await form.locator("#register").click();
}

test.describe("[UI][Demo Login Form][Registration] Negative scenarios", () => {
  for (const data of registrationInvalidTestData) {
    test(data.testName, async ({ page }) => {
      await openRegistrationPage(page);
      const form = page.locator(".registerForm");
      await removeInputsMaxLength(
        page,
        data.username,
        data.password,
        data.maxLength
      );

      await fillCredentialsAndSubmit(form, data.username, data.password);

      await expect(form.locator("#errorMessageOnRegister")).toHaveText(
        data.message
      );
    });
  }

  test("Should not pass registration twice with the same data", async ({
    page,
  }) => {
    await openRegistrationPage(page);
    const validUserName = "User001";
    const validPassword = "Password";
    const form = page.locator(".registerForm");
    await fillCredentialsAndSubmit(form, validUserName, validPassword);
    await fillCredentialsAndSubmit(form, validUserName, validPassword);
    await expect(form.locator("#errorMessageOnRegister")).toHaveText(
      "Username is in use"
    );
  });
});
