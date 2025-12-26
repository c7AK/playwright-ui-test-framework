import { test, expect } from '../fixtures/pageFixtures';
import { TestData } from '../utils/testData';

test.describe('Cart Page Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    await inventoryPage.verifyOnInventoryPage();
  });

  test('should display empty cart when no items added', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.verifyOnCartPage();

    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(0);
  });

  test('should display added items in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByName(TestData.products.backpack);
    await inventoryPage.addItemToCartByName(TestData.products.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.verifyOnCartPage();

    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(2);

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain(TestData.products.backpack);
    expect(cartItemNames).toContain(TestData.products.bikeLight);
  });

  test('should remove item from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByName(TestData.products.backpack);
    await inventoryPage.addItemToCartByName(TestData.products.bikeLight);
    await inventoryPage.goToCart();

    await cartPage.verifyOnCartPage();

    await cartPage.removeItemByName(TestData.products.backpack);

    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(1);

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).not.toContain(TestData.products.backpack);
    expect(cartItemNames).toContain(TestData.products.bikeLight);
  });

  test('should navigate back to shopping', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.verifyOnCartPage();
    await cartPage.continueShopping();

    await inventoryPage.verifyOnInventoryPage();
  });
});
