import { Locator, Page, expect } from '@playwright/test';

export class SetDueDatePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setDueDateByText(itemName: string, day: string, monthNavigation: 'previous' | 'current' | 'next'): Promise<void> {
        const itemSelector = this.page.locator('.ItemContent', { hasText: itemName });  
        await itemSelector.hover();

        const dueDateButton = itemSelector.locator('text=Set Due Date');
        await dueDateButton.click();

        if (monthNavigation === 'previous') {
            await this.page.getByTitle('Prev').click();
        } else if (monthNavigation === 'next') {
            await this.page.getByTitle('Next').click();
        }

        await this.page.getByRole('link', { name: day }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async verifyDueDateByText(itemName: string, expectedDate: string): Promise<void> {
        const dueDateText = this.page.locator('.ItemContent', { hasText: itemName }).locator('.ItemDueDateInner');
        await expect(dueDateText).toHaveText(expectedDate);
    }
}
