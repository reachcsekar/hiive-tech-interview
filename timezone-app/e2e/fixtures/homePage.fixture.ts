import { test as base } from '@playwright/test';
//import { mergeTests } from '@playwright/test';
import { HomePage } from '../pages/homePage-page';

type HomePageFixture = {
    homePage: HomePage;
};

// Extend the "base" object exposed by PlayWright with the fixture type defined above. 
// The "base" object can be assigned to the "test" object exposed by Playwright.
// That approach would work for small projects where there aren't a lot of fixtures defined.
// However, in projects where the frameworks has to be scaled to include hundreds of page definitions 
// as part of the "Page Object Model", to define multiple fixtures and to develope thousands of tests (possibly),
//  the better approach is to merge all the fixtures in a separate fixture using "mergeTests" function 
// and exporting that as the "test" object.
export const homePageFixture = base.extend<HomePageFixture> ({

    homePage: async ({ page}, use) => {
        await use(new HomePage(page));
    },
    

});
export { expect } from '@playwright/test';
