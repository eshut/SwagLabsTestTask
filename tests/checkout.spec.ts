// https://github.com/eshut/SwagLabsTestTask
import { test, expect } from '../src/fixtures/test-fixtures';
import { CHECKOUT_CUSTOMER } from '../src/data/checkout';

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

    await checkoutStepOnePage.fillForm(
      CHECKOUT_CUSTOMER.firstName,
      CHECKOUT_CUSTOMER.lastName,
      CHECKOUT_CUSTOMER.postalCode,
    );
    await checkoutStepOnePage.continue();

    await expect(checkoutStepTwoPage.total).toBeVisible();
    await checkoutStepTwoPage.finish();

    await expect(checkoutCompletePage.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  });
});
