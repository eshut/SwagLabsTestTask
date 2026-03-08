// https://github.com/eshut/SwagLabsTestTask
import { test, expect } from '../src/fixtures/test-fixtures';

const PRODUCT_NAME = 'Sauce Labs Backpack';

test.describe('Checkout', () => {
  test('complete checkout process', async ({
    authenticatedPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCT_NAME);
    await authenticatedPage.goToCart();

    await cartPage.checkout();

    await checkoutStepOnePage.fillForm('John', 'Doe', '12345');
    await checkoutStepOnePage.continue();

    await expect(checkoutStepTwoPage.total).toBeVisible();
    await checkoutStepTwoPage.finish();

    await expect(checkoutCompletePage.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  });
});
