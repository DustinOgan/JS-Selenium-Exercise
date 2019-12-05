require("mocha");
const webdriver = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;

describe('JS-Selenium-Exercise', function () {
    describe('Test1', function () {
        it('should follow the instructions', async function () {
            this.timeout(20000);
            const driver = new webdriver.Builder()
                .forBrowser('firefox')
                .build();

            // Open google.com
            await driver.get("http://www.google.com");

            // Example assertion:
            let title = await driver.getTitle();
            assert.equal(title, "Google");

            // Check that the google logo is visible


            // Check there are two options present: "Google Search" and "I'm Feeling Lucky"


            // Enter text "PayPal" and click "I'm Feeling Lucky"


            // Check the url is now "https://www.paypal.com/"


            // Click "Sitemap"


            // Check the url is now "https://www.paypal.com/us/webapps/mpp/full-sitemap"



            // Store all of the links on this page into a list and then print them all to system.out


            await driver.quit();
        })
    })
});