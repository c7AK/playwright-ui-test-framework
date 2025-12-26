import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPageElements } from './elements/LoginPageElements';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async enterUsername(username: string): Promise<void> {
    await this.getLocator(LoginPageElements.usernameInput).fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.getLocator(LoginPageElements.passwordInput).fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.getLocator(LoginPageElements.loginButton).click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getLocator(LoginPageElements.errorMessage).textContent() || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.getLocator(LoginPageElements.errorMessage).isVisible();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.getLocator(LoginPageElements.logo).isVisible();
  }

  async verifyOnLoginPage(): Promise<void> {
    await expect(this.getLocator(LoginPageElements.loginButton)).toBeVisible();
  }
}
