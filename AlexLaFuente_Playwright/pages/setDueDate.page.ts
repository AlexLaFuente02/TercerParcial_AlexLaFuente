import { Locator, Page, expect } from '@playwright/test';

export class SetDueDatePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setDueDate(itemIndex: number, day: string, monthNavigation: 'previous' | 'current' | 'next'): Promise<void> {
        // Realiza hover sobre el ítem para que aparezca "Set Due Date"
        const itemSelector = this.page.locator('.ItemContent').nth(itemIndex);
        await itemSelector.hover();

        const dueDateButton = itemSelector.locator('text=Set Due Date');
        await dueDateButton.click();

        if (monthNavigation === 'previous') {
            await this.page.getByTitle('Prev').click();
        } else if (monthNavigation === 'next') {
            await this.page.getByTitle('Next').click();
        }

        // Selecciona la fecha del calendario
        await this.page.getByRole('link', { name: day }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async verifyDueDate(itemIndex: number, expectedDate: string): Promise<void> {
        // Localiza el texto del due date asociado al ítem
        const dueDateText = this.page.locator('.ItemContent').nth(itemIndex).locator('.ItemDueDateInner');
    
        // Verifica que el due date sea el esperado
        await expect(dueDateText).toHaveText(expectedDate);
    }
    
}
