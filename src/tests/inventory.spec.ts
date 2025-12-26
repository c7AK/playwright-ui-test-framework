import { test, expect } from '../fixtures/pageFixtures';
import { TestData } from '../utils/testData';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    await inventoryPage.verifyOnInventoryPage();
  });

  test('should display all inventory items', async ({ inventoryPage }) => {
    const itemCount = await inventoryPage.getInventoryItemsCount();
    expect(itemCount).toBe(6);
  });

  test('should display correct product names', async ({ inventoryPage }) => {
    const itemNames = await inventoryPage.getItemNames();
    expect(itemNames).toContain(TestData.products.backpack);
    expect(itemNames).toContain(TestData.products.bikeLight);
    expect(itemNames).toContain(TestData.products.boltTshirt);
  });

  test('should add item to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName(TestData.products.backpack);

    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);
  });

  test('should add multiple items to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName(TestData.products.backpack);
    await inventoryPage.addItemToCartByName(TestData.products.bikeLight);
    await inventoryPage.addItemToCartByName(TestData.products.boltTshirt);

    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(3);
  });

  test('should remove item from cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName(TestData.products.backpack);
    await inventoryPage.addItemToCartByName(TestData.products.bikeLight);

    let cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(2);

    await inventoryPage.removeItemFromCartByName(TestData.products.backpack);
    cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);
  });

  test('should sort products by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const itemNames = await inventoryPage.getItemNames();

    const sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);
  });

  test('should sort products by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const itemNames = await inventoryPage.getItemNames();

    const sortedNames = [...itemNames].sort().reverse();
    expect(itemNames).toEqual(sortedNames);
  });

  test('should navigate to cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.verifyOnCartPage();

    const pageTitle = await cartPage.getPageTitle();
    expect(pageTitle).toBe('Your Cart');
  });

  test('should logout successfully', async ({ inventoryPage, loginPage }) => {
    await inventoryPage.logout();
    await loginPage.verifyOnLoginPage();
  });
});
