//import type { Page } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import { baseURL } from '../env.config';
import { expect } from '@playwright/test';
import exp from 'constants';

// This file has the locator definition for home page objects. 
// It may also have some object specifc functions that would be used by tests

export class HomePage {
    readonly addTimeZoneBtn: Locator
    readonly labelTextField: Locator
    readonly locationDropDown: Locator
    readonly saveButton: Locator
    readonly recordsTableRows: Locator

    constructor(public readonly page: Page) {
        
        this.addTimeZoneBtn = this.page.getByRole('button', {name: 'Add timezone'});
        this.labelTextField = this.page.getByPlaceholder('Label');
        this.locationDropDown = this.page.locator('#timezone');
        this.saveButton = this.page.getByRole('button', {name : 'Save'});
        this.recordsTableRows = this.page.locator('table tbody tr');

    }

    async goTo() {
        await this.page.goto(baseURL);        
        await expect(this.page).toHaveTitle(/Time Keeper/);
    }

    // This function is written to handle possible hydration issues with the web page
    // where the page is loaded but the listerens are not added to Add timezone button.
    // Poor hydration is handled by using "toPass" to retry clicking the Add timezone button
    // till the "Label" text box is editable.
    async clickTimezoneBtn() {
        await expect (async () => {
            await this.addTimeZoneBtn.click();
            await expect(this.labelTextField).toBeEditable({timeout: 500 });
        }).toPass({ intervals: [1000], timeout: 5000 });
    }

    // This function is to add a time zone record and 
    async addTimezone(label: string, location: string) {
        await this.clickTimezoneBtn();
        await this.labelTextField.fill(label);
        await this.locationDropDown.selectOption(location);
        await this.saveButton.click();

    }

    // This function is written to handle possible hydration issues with the web page
    // where the page is loaded but the listerens are not added to Add timezone button.
    // Poor hydration is handled by using "toPass" to wait for table to be displayed in view port.

    async waitForRecordTableInViewPort(){
        await expect(async () => {
            await expect(this.recordsTableRows).toBeInViewport();
        }).toPass({ intervals: [1000], timeout: 5000 });
    }

    // This function is to fetch the current time zone from the record that is added when the application is launched
    async getCurrentTimezoneCity(): Promise<String> {
        await this.waitForRecordTableInViewPort();
        const recordCount = await this.recordsTableRows.count();
        expect(recordCount).toEqual(1);
        let row = await this.recordsTableRows.filter({ hasText: 'Local(You)' });
        let columnValue = await row.locator('td').nth(1).innerText();
        let currentCity = columnValue.split('/')[1];
        return currentCity;
    }

    async deleteRecord(location: string) {
        await this.recordsTableRows.filter({ hasText: location }).locator('td').nth(3).getByRole('button', { name: 'Delete' }).click();
    }

    async verifyRecordDeleted(location: string): Promise<void> {
        expect(await this.recordsTableRows.filter({ hasText: location }).count()).toEqual(0);
    }

    async verifyRecordAdded(location: string): Promise<void> {
        expect(await this.recordsTableRows.filter({ hasText: location }).count()).toEqual(1);
    }
}
