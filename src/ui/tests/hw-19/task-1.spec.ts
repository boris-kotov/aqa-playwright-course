// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.describe("[UI] [Dynamic Controls] Work with dynamic controls", () => {
  test("Dynamic controls test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const dynamicLoadingLink = page.getByRole("link", {
      name: "Dynamic Controls",
      exact: true,
    });
    await dynamicLoadingLink.click();

    const removeButton = page.getByRole("button", {
      name: "Remove",
      exact: true,
    });
    expect(removeButton).toBeVisible();

    const dynamicControlsHeading = page.getByRole("heading", {
      name: "Dynamic Controls",
      exact: true,
    });
    await expect(dynamicControlsHeading).toHaveText("Dynamic Controls");

    const dynamicControlsContent = page.getByRole("paragraph");
    await expect(dynamicControlsContent).toHaveText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );

    const dynamicCheckbox = page.getByRole("checkbox");
    await dynamicCheckbox.click();
    await expect(dynamicCheckbox).toBeChecked();

    await removeButton.click();
    await expect(dynamicCheckbox).toBeHidden();

    const addButton = page.getByRole("button", { name: "Add", exact: true });
    await expect(addButton).toBeVisible();

    const infoMessage = page.locator("#message");
    await expect(infoMessage).toHaveText("It's gone!");

    await addButton.click();
    await expect(dynamicCheckbox).toBeVisible();

    await expect(infoMessage).toHaveText("It's back!");
  });
});
