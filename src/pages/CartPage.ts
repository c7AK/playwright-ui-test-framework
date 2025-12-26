import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPageElements } from './elements/CartPageElements';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyOnCartPage(): Promise<void> {
    await expect(this.getLocator(CartPageElements.cartList)).toBeVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.getLocator(CartPageElements.pageTitle).textContent() || '';
  }

  async getCartItemsCount(): Promise<number> {
    return await this.getLocator(CartPageElements.cartItem).count();
  }

  async getCartItemNames(): Promise<string[]> {
    const items = this.getLocator(CartPageElements.cartItemName);
    const count = await items.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async removeItemByName(itemName: string): Promise<void> {
    const item = this.getLocator(CartPageElements.cartItem).filter({
      hasText: itemName,
    });
    await item.locator(CartPageElements.removeButton).click();
  }

  async continueShopping(): Promise<void> {
    await this.getLocator(CartPageElements.continueShoppingButton).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.getLocator(CartPageElements.checkoutButton).click();
  }
}
