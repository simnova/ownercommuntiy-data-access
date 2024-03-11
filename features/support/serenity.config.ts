import { AfterAll, BeforeAll, setDefaultTimeout, defineParameterType } from '@cucumber/cucumber';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { actorCalled, actorInTheSpotlight, ArtifactArchiver, configure, Duration } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
// import { Photographer, TakePhotosOfFailures, TakePhotosOfInteractions /* TakePhotosOfFailures */ } from '@serenity-js/web';
import { resolve } from 'path';
// import * as playwright from 'playwright';

import { Actors } from './actors';

const projectRoot   = resolve(__dirname, '../..');

const baseURL = 'http://localhost:3000';

const timeouts = {
    cucumber: {
        step: Duration.ofSeconds(30),                       // how long to wait for a Cucumber step to complete
    },
    // playwright: {
    //     defaultNavigationTimeout: Duration.ofSeconds(3),        // how long to wait for a page to load
    //     defaultTimeout:           Duration.ofMilliseconds(500), // how long to wait for an element to show up
    // },
    // serenity: {
    //     cueTimeout:               Duration.ofSeconds(5),    // how long to wait for Serenity/JS to complete any post-test activities, like saving screenshots and reports
    // }
}

// let browser: playwright.Browser;

BeforeAll(async () => {
    // Launch the browser once before all the tests
    // Serenity/JS will take care of managing Playwright browser context and browser tabs.
    // browser = await playwright.chromium.launch({
    //     // headless: false,     // enable non-headless mode
    //     // slowMo: 500,         // and slow down each Playwright command to see tests in action
    // });

    // Configure Cucumber
    setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

    // Configure Serenity/JS
    configure({
      // actors: new Actors(),

        // Configure Serenity/JS actors to use Playwright browser
        // actors: new Actors(browser, {
        //     baseURL:                    baseURL,
        //     defaultNavigationTimeout:   timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
        //     defaultTimeout:             timeouts.playwright.defaultTimeout.inMilliseconds(),
        //     defaultNavigationWaitUntil: 'networkidle',
        // }),

        // Configure Serenity/JS reporting services
        // crew: [
        //     ArtifactArchiver.storingArtifactsAt(projectRoot, 'target/site/serenity'),   // this is the default location where Serenity BDD reporting CLI looks for reports
        //     new SerenityBDDReporter(),
        //     ConsoleReporter.forDarkTerminals(),
        //     Photographer.whoWill(TakePhotosOfInteractions),         // capture screenshots of all the interactions; slower but more comprehensive
        //     // Photographer.whoWill(TakePhotosOfFailures),             // capture screenshots of failed interactions; much faster
        // ],

        // cueTimeout: timeouts.serenity.cueTimeout,
    });
});

// AfterAll(async () => {
//     // Close the browser after all the tests are finished
//     if (browser) {
//         await browser.close();
//     }
// })

// defineParameterType({
//   regexp: /[A-Z][a-z]+/,
//   transformer(name: string) {
//       return actorCalled(name);
//   },
//   name: 'actor',
// });

// defineParameterType({
//   regexp: /he|she|they|his|her|their/,
//   transformer() {
//       return actorInTheSpotlight();
//   },
//   name: 'pronoun',
// });