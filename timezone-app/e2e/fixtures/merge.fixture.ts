import { mergeTests } from "@playwright/test";

import {homePageFixture} from './homePage.fixture';

export const test = mergeTests(homePageFixture);
export { expect } from '@playwright/test';
