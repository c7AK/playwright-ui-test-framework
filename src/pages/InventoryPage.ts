import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPageElements } from './elements/InventoryPageElements';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyOnInventoryPage(): Promise<void> {
    await expect(this.getLocator(InventoryPageElements.inventoryContainer)).toBeVisible();
  }

  async getPageTitle(): Promise<string> {
    return await this.getLocator(InventoryPageElements.pageTitle).textContent() || '';
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.getLocator(InventoryPageElements.inventoryItem).count();
  }

  async getItemNames(): Promise<string[]> {
    const items = this.getLocator(InventoryPageElements.itemName);
    const count = await items.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async addItemToCartByIndex(index: number): Promise<void> {
    await this.getLocator(InventoryPageElements.addToCartButton).nth(index).click();
  }

  async addItemToCartByName(itemName: string): Promise<void> {
    const item = this.getLocator(InventoryPageElements.inventoryItem).filter({
      hasText: itemName,
    });
    await item.locator(InventoryPageElements.addToCartButton).click();
  }

  async removeItemFromCartByName(itemName: string): Promise<void> {
    const item = this.getLocator(InventoryPageElements.inventoryItem).filter({
      hasText: itemName,
    });
    await item.locator(InventoryPageElements.removeButton).click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.getLocator(InventoryPageElements.shoppingCartBadge);
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  async goToCart(): Promise<void> {
    await this.getLocator(InventoryPageElements.shoppingCartLink).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.getLocator(InventoryPageElements.sortDropdown).selectOption(option);
  }

  async logout(): Promise<void> {
    await this.getLocator(InventoryPageElements.burgerMenuButton).click();
    await this.getLocator(InventoryPageElements.logoutLink).click();
  }
}
