import { Locator, Page, expect } from '@playwright/test';

export class AddItemsPage {
    readonly page: Page;
    readonly newItemInput: Locator;
    readonly addButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newItemInput = page.locator('#NewItemContentInput');
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    async addItem(itemName: string): Promise<void> {
        await this.newItemInput.click();
        await this.newItemInput.fill(itemName);
        await this.addButton.click();
    }

    async verifyItemAdded(itemName: string): Promise<void> {
        const itemLocator = this.page.locator('.ItemContent', { hasText: itemName });
        await expect(itemLocator).toBeVisible();
    }
}
