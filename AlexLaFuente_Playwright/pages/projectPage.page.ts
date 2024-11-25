import { Locator, Page } from '@playwright/test';

export class ProjectPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
        this.loginButton = page.getByRole('button', { name: 'Submit' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.page.goto('https://todo.ly/');
        await this.page.locator('.HPHeaderLogin').click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async selectProject(projectName: string): Promise<void> {
        await this.page.locator('li').filter({ hasText: projectName }).click();
    }
}
