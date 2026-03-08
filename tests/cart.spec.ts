// https://github.com/eshut/SwagLabsTestTask
import { test, expect } from '../src/fixtures/test-fixtures';
import { CART_BADGE_SINGLE_ITEM } from '../src/constants';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Cart', () => {
  test('add a product to the cart', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCartByName(PRODUCT_NAME);
    await expect(authenticatedPage.cartBadge).toHaveText(CART_BADGE_SINGLE_ITEM);

    await authenticatedPage.goToCart();
    await expect(cartPage.getItemByName(PRODUCT_NAME)).toBeVisible();
  });
});
