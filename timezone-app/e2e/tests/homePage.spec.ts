import { homePageFixture } from '../fixtures/homePage.fixture';
import { test,expect } from '../fixtures/merge.fixture';
import { HomePage } from '../pages/homePage-page';

test.beforeEach(async ({ homePage }) => {
    // Navigate to home page
    homePage.goTo();
});

// Data parametrization to cover all te possible location values. 
// Local location will be skipped as a record is created when app is launched.
[
    { label: 'EST', location: 'Eastern Standard Time', city: 'New_York' },
    { label: 'PST', location: 'Pacific Standard Time', city: 'Los_Angeles' },
    { label: 'CST', location: 'Central Standard Time', city: 'Chicago' },
    { label: 'MST', location: 'Mountain Standard Time', city: 'Denver' },
    { label: 'AST', location: 'Alaska Standard Time', city: 'Juneau' },
    { label: 'CST', location: 'Hawaii-Aleutian Standard Time', city: 'Honolulu' },
  ].forEach(({ label, location, city }) => {
    test(`Add a record with ${label} and ${location}`, async ({ homePage }) => {
        let localCity = await homePage.getCurrentTimezoneCity();
        if (localCity != city) 
        {
            await homePage.addTimezone(label, location);
            await homePage.verifyRecordAdded(city);
        }
        else 
        {
            console.log('Skipping adding record for local time zone -- ${location}.');
        }
    });
  });

  test('Verify that one record in local time zone is created when app is launched', async ({ homePage }) => {
    await homePage.waitForRecordTableInViewPort();
    const recordCount = await homePage.recordsTableRows.count();
    expect(recordCount).toEqual(1);    
    let labelName = await homePage.recordsTableRows.nth(0).locator('td').nth(0).innerText();
    expect(labelName).toEqual('Local(You)');
  });
  
  test('Delete a record', async ({ homePage }) => { 
    await homePage.addTimezone('EST', 'Eastern Standard Time');
    await homePage.deleteRecord('New_York');
    await homePage.verifyRecordDeleted('New_York');
  });