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

    await addItemsPage.addItem('Media libra tomate');
    await addItemsPage.addItem('Dos arrobas de papa');

    await addItemsPage.verifyItemAdded('Media libra tomate');
    await addItemsPage.verifyItemAdded('Dos arrobas de papa');

    await setDueDatePage.setDueDate(0, '15', 'next');
    await setDueDatePage.verifyDueDate(0, '15 Dec 12:00 AM');
});
