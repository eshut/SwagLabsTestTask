// https://github.com/eshut/SwagLabsTestTask
import { test, expect } from '../src/fixtures/test-fixtures';
import { STANDARD_USER, LOCKED_OUT_USER } from '../src/data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('successful login with standard_user', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

    await expect(inventoryPage.title).toHaveText('Products');
    await expect(loginPage.page).toHaveURL(/inventory\.html/);
  });

  test('failed login with locked_out_user', async ({ loginPage }) => {
    await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password);

    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out',
    );
  });
});
