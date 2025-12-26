import { test, expect } from '../fixtures/pageFixtures';
import { TestData, ErrorMessages } from '../utils/testData';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display login page correctly', async ({ loginPage }) => {
    const isLogoVisible = await loginPage.isLogoVisible();
    expect(isLogoVisible).toBe(true);
    await loginPage.verifyOnLoginPage();
  });

  test('should login successfully with valid credentials', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    await inventoryPage.verifyOnInventoryPage();

    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');
  });

  test('should display error message for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(TestData.invalidUser.username, TestData.invalidUser.password);

    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ErrorMessages.invalidCredentials);
  });

  test('should display error for locked out user', async ({ loginPage }) => {
    await loginPage.login(TestData.lockedUser.username, TestData.lockedUser.password);

    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ErrorMessages.lockedUser);
  });

  test('should display error when username is empty', async ({ loginPage }) => {
    await loginPage.enterPassword(TestData.validUser.password);
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ErrorMessages.usernameRequired);
  });

  test('should display error when password is empty', async ({ loginPage }) => {
    await loginPage.enterUsername(TestData.validUser.username);
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(ErrorMessages.passwordRequired);
  });
});
