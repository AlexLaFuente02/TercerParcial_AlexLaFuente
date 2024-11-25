import { test } from '@playwright/test';
import { ProjectPage } from '../pages/projectPage.page';
import { AddItemsPage } from '../pages/addItems.page';
import { SetDueDatePage } from '../pages/setDueDate.page';

test('Add items and set due dates', async ({ page }) => {
    const projectPage = new ProjectPage(page);
    const addItemsPage = new AddItemsPage(page);
    const setDueDatePage = new SetDueDatePage(page);

    await projectPage.login('alexlafuentelp@gmail.com', 'Abilufa2');
    await projectPage.selectProject('Shopping List');

    // Genera nombres únicos para los ítems
    const item1 = `Media libra tomate ${Date.now()}`;
    const item2 = `Dos arrobas de papa ${Date.now() + 1}`;

    await addItemsPage.addItem(item1);
    await addItemsPage.verifyItemAdded(item1);

    await addItemsPage.addItem(item2);
    await addItemsPage.verifyItemAdded(item2);

    await setDueDatePage.setDueDateByText(item1, '15', 'next');
    await setDueDatePage.verifyDueDateByText(item1, '15 Dec 12:00 AM');
});
