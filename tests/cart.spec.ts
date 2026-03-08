// https://github.com/eshut/SwagLabsTestTask
import { test, expect } from '../src/fixtures/test-fixtures';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart', () => {
  test('add a product to the cart', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCartByName(PRODUCT_NAME);
    await expect(authenticatedPage.cartBadge).toHaveText('1');

    await authenticatedPage.goToCart();
    await expect(cartPage.getItemByName(PRODUCT_NAME)).toBeVisible();
  });
});
