# Playwright UI Automation Boilerplate

A robust Playwright test framework with Page Object Model, multi-environment support, and CI/CD integration.

## Features

- **Page Object Model (POM)** - Elements separated from page logic for maintainability
- **Multi-Environment Support** - Run tests against dev, staging, or prod
- **Cross-Browser Testing** - Chromium, Firefox, WebKit, and mobile browsers
- **Custom Fixtures** - Reusable page object fixtures
- **HTML Reports** - Detailed test reports with screenshots and videos
- **GitHub Actions CI** - Automated testing on push/PR

## Project Structure

```
├── .github/workflows/
│   └── playwright.yml          # GitHub Actions CI workflow
├── config/
│   └── environments.ts         # Environment configurations
├── src/
│   ├── fixtures/
│   │   └── pageFixtures.ts     # Custom Playwright fixtures
│   ├── pages/
│   │   ├── elements/           # Page element selectors
│   │   │   ├── LoginPageElements.ts
│   │   │   ├── InventoryPageElements.ts
│   │   │   └── CartPageElements.ts
│   │   ├── BasePage.ts         # Base page class
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts
│   ├── tests/
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   └── cart.spec.ts
│   └── utils/
│       └── testData.ts         # Test data and constants
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json
└── package.json
```

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd playwright-ui-automation-boilerplate

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Basic Commands

```bash
# Run all tests on all browsers
npm test

# Run tests on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests on mobile browsers
npm run test:mobile
```

### Debug & Development

```bash
# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open Playwright UI mode (interactive)
npm run test:ui
```

### Environment-Specific Tests

```bash
# Run against dev environment (default)
npm run test:dev

# Run against staging environment
npm run test:staging

# Run against production environment
npm run test:prod
```

### View Reports

```bash
# Open HTML report in browser
npm run report

# Clean test results and reports
npm run clean
```

## Configuration

### Environment Configuration

Edit `config/environments.ts` to configure different environments:

```typescript
const environments = {
  dev: {
    baseUrl: 'https://your-dev-url.com',
    credentials: {
      username: 'dev_user',
      password: 'dev_password',
    },
  },
  staging: {
    baseUrl: 'https://your-staging-url.com',
    credentials: {
      username: 'staging_user',
      password: 'staging_password',
    },
  },
  prod: {
    baseUrl: 'https://your-prod-url.com',
    credentials: {
      username: 'prod_user',
      password: 'prod_password',
    },
  },
};
```

### Playwright Configuration

Key settings in `playwright.config.ts`:

| Setting | Local | CI |
|---------|-------|-----|
| Retries | 0 | 2 |
| Workers | Auto | 1 |
| Reporter | HTML, JSON | Blob, GitHub |
| Screenshots | On failure | On failure |
| Video | On failure | On failure |
| Trace | On first retry | On first retry |

## Writing Tests

### Using Page Objects

```typescript
import { test, expect } from '../fixtures/pageFixtures';
import { TestData } from '../utils/testData';

test('should login successfully', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(TestData.validUser.username, TestData.validUser.password);
  await inventoryPage.verifyOnInventoryPage();
});
```

### Adding New Page Objects

1. Create element selectors in `src/pages/elements/`:

```typescript
// src/pages/elements/NewPageElements.ts
export const NewPageElements = {
  header: '[data-test="header"]',
  submitButton: '[data-test="submit"]',
} as const;
```

2. Create the page class in `src/pages/`:

```typescript
// src/pages/NewPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NewPageElements } from './elements/NewPageElements';

export class NewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickSubmit(): Promise<void> {
    await this.getLocator(NewPageElements.submitButton).click();
  }
}
```

3. Add to fixtures in `src/fixtures/pageFixtures.ts`:

```typescript
import { NewPage } from '../pages/NewPage';

type PageFixtures = {
  // ... existing fixtures
  newPage: NewPage;
};

export const test = base.extend<PageFixtures>({
  // ... existing fixtures
  newPage: async ({ page }, use) => {
    await use(new NewPage(page));
  },
});
```

## CI/CD

### GitHub Actions

The workflow runs automatically on:
- Push to `main` or `master`
- Pull requests to `main` or `master`
- Manual trigger with environment selection

### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **Playwright Tests** workflow
3. Click **Run workflow**
4. Select environment (dev/staging/prod)
5. Click **Run workflow**

### Artifacts

After each run, the following artifacts are available:
- `playwright-report-{browser}` - Individual browser reports
- `test-results-{browser}` - Screenshots/videos on failures
- `playwright-report-merged` - Combined HTML report

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:chromium` | Run on Chrome |
| `npm run test:firefox` | Run on Firefox |
| `npm run test:webkit` | Run on Safari |
| `npm run test:mobile` | Run on mobile devices |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Run in debug mode |
| `npm run test:ui` | Open Playwright UI |
| `npm run test:dev` | Run against dev env |
| `npm run test:staging` | Run against staging env |
| `npm run test:prod` | Run against prod env |
| `npm run report` | Open HTML report |
| `npm run clean` | Clean test artifacts |

## License

ISC
