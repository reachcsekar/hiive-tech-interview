# Test Assignment - Report

## Reference

- [Link](https://github.com/reachcsekar/hiive-tech-interview/tree/main/timezone-app/e2e) to public `GitHub` repo where the automated tests are available.
- Automated tests
  - [Tests](https://github.com/reachcsekar/hiive-tech-interview/blob/main/timezone-app/e2e/tests/homePage.spec.ts)
  - [Fixtures](https://github.com/reachcsekar/hiive-tech-interview/tree/main/timezone-app/e2e/fixtures)
  - [Pages](https://github.com/reachcsekar/hiive-tech-interview/tree/main/timezone-app/e2e/pages)
  - [Test Results](https://github.com/reachcsekar/hiive-tech-interview/blob/main/timezone-app/playwright-test-results.png)
- [Bugs](https://github.com/reachcsekar/hiive-tech-interview/issues)

## Overview

This document covers the details of testing activities done as part of take home assignment. The assignment is one of the stages in the interview process for the position of `Senior Engineer in Test/Test Lead` position in `Hiive`.

## Scope
The scope of testing is limited to what is defined in https://you.ashbyhq.com/hiive/assignment/9ed30791-9d0b-43cd-928a-0798b176fe26 which is:
- manual testing of a web application and capturing issues in a public `GitHub` repo.
- automation of end-to-end test cases/scenarios using a combination of `Playwright` and `Typescript`.

## Manual/Exploratory Testing
Based on the specifications provided as part of the assignment, verification of the web application was done to ensure that the application behaves as per the requirements. The following bugs were raised:

| Bug # | Link | Bug Description | Type |
| -- | -- | -- | -- |
| 1 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/1) | Records in table are not sorted by current time | Functional |
| 2 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/2) | User is able to delete the local timezone record. | Functional |
| 3 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/3) | Unable to add multiple records with same time zone | Functional |
| 4 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/4) | Records are deleted when application is refreshed | Functional |
| 5 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/5) | No error message is displayed when Save button is clicked with empty values | UX |
| 6 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/6) | Timezone displayed in table is different from value selected during record creation | UX |
| 7 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/7) | Stale version of Next.js | Packaging/Build |
| 8 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/8) | Unhandled run time error when browser is refreshed | |
| 9 | [Click](https://github.com/reachcsekar/hiive-tech-interview/issues/9) | User is able to create a new record with the same label as the local timezone record | Accessibility |

## Automation Testing

## Scenarios/Cases
Since the intent is to automate end-to-end cases, it makes more sense to automate cases that focus on validating product features than to focus on component/field level cases. For instance, automating the scenario to add a time zone is much more valuable than automating the case to verify whether a text field accepts only alpha-numeric values. Even though it may be easier (and tempting) to automate the component-level scenarios, automating user facing scenarios will be more beneficial in the long-term. Component level scenarios can be covered through unit tests/API tests which will also reduce the execution time of end-to-end test suite.

## Framework
A combination of `Playwright` and `Typescript` is used to develop end-to-end automated tests for the web application. Even though the tests and the supporting libraries do not resemble how a framework will look in real world, a few important constructs that are critical to using `Playwright` tool and are considered best practices in automated test frameworks have been used.

### Page Object Model
A page object model is a popular way to structure and encapsulate locator definitons of web pages in application and to provide an easy interface to access common actions and validations that can be performed on the web page. The page object model component developed for `timezone` app is available [here](https://github.com/reachcsekar/hiive-tech-interview/tree/main/timezone-app/e2e/pages). Even though a separate component for this app might be unwarranted, the intent is to showcase the use of a powerful way to develop and maintain interfaces for tests.

### Fixtures
`Fixtures` are utilities that are generally provided out of the box by test frameworks. They are similar to `setup` and `teardown` constructs in unit testing frameworks but implement these constructs in a much elegant way. `Fixtures` in `Playwright` do the function of making the test environment available to tests. `Merge Fixtures` is a utility that allows merging multiple fixtures and make it available to tests. This is quite useful in real world projects where engineers would prefer to organize fixtures across multiple files.

### Hydration
The protocol used by `Playwright` to interact with browsers is asyncronous. This makes `Playwright` much better than `Selenium` in most cases. However, poor `hydration` while rendering web content cannot be avoided and `Playwright` tests are known to fail due to this. There are multiple ways to handle `hydration` issue and one such way is to use `toPass` function that provides a way to retry a set of steps till they pass or timeout. This function is used in the tests developed for the web app. Another way is to use [Auto-Retrying](https://playwright.dev/docs/test-assertions#auto-retrying-assertions).



