// Разработать тест со следующими шагами:
// https://anatoly-karpovich.github.io/demo-shopping-cart/
//   - добавить продукты 2,4,6,8,10
//   - завалидировать бейдж с количеством
//   - открыть чекаут
//   - завалидировать сумму и продукты
//   - ввести все найденные вами промокоды (вспоминаем первую лекцию)
//   - завалидировать конечную сумму
//   - зачекаутиться
//   - завалидировать сумму

import test, { expect, Locator, Page } from "@playwright/test";
import { count } from "console";

enum PROMOCODES {
  PROMOCODE1 = "JAVA-FOR-BOOMERS",
  PROMOCODE2 = "NO-PYTHON",
  PROMOCODE3 = "HOT-COURSE",
  PROMOCODE4 = "10-PERCENT-FOR-REDEEM",
  PROMOCODE5 = "5-PERCENT-FOR-UTILS",
  PROMOCODE6 = "15-PERCENT-FOR-CSS",
  PROMOCODE7 = "HelloThere",
}

test.describe("[UI] [Demo Shopping Cart] [E2E]]", async () => {
  const shoppingCartPage =
    "https://anatoly-karpovich.github.io/demo-shopping-cart/";
  test("Successfull checkout with odd products", async ({ page }) => {
    await page.goto(shoppingCartPage);
    await getAddToCardButton("Product 2", page).click();
    await getAddToCardButton("Product 4", page).click();
    await getAddToCardButton("Product 6", page).click();
    await getAddToCardButton("Product 8", page).click();
    await getAddToCardButton("Product 10", page).click();

    const [price2, price4, price6, price8, price10] = await Promise.all([
      getProductPrice("Product 2", page),
      getProductPrice("Product 4", page),
      getProductPrice("Product 6", page),
      getProductPrice("Product 8", page),
      getProductPrice("Product 10", page),
    ]);

    const total = price2 + price4 + price6 + price8 + price10;

    await expect(page.locator("#badge-number")).toHaveText("5");

    await page.getByRole("button", { name: "Shopping Cart" }).click();

    await expect(page.locator("#total-price")).toHaveText(`$${total}.00`);

    await applyPromocodes(page, Object.values(PROMOCODES));

    const totalDiscountPercentage = await countTotalDiscount(page);
    const calculatedDiscount = (total / 100) * totalDiscountPercentage;
    const priceWithDiscount = total - calculatedDiscount;

    await expect(page.locator("#total-price")).toHaveText(
      `$${priceWithDiscount.toFixed(2)} (-$${calculatedDiscount.toFixed(1)})`
    );
  });
});

function getAddToCardButton(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .locator("span");
}

async function getProductPrice(
  productName: string,
  page: Page
): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace("$", "");
  return +price;
}

async function applyPromocodes(page: Page, PROMOCODES: PROMOCODES[]) {
  const promocodeInput = page.locator("#rebate-input");
  const submitPromocodeButton = page.locator("#apply-promocode-button");
  for (const promocode of PROMOCODES) {
    await promocodeInput.fill(promocode);
    await submitPromocodeButton.click();
    await expect(page.locator(".spinner-border")).toBeHidden({timeout: 20000});
    
  }
}

async function countTotalDiscount(page: Page) {
  const discountArray = await page
    .locator("#rebates-list small")
    .allInnerTexts();
  return discountArray.reduce(
    (discountCounter, oneDiscount) =>
      discountCounter + +oneDiscount.replace("-", "").replace("%", ""),
    0
  );
}
