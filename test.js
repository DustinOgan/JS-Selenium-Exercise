require("mocha");
const webdriver = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;
const googleHome = require("./page_elements/google_home");
const paypal = require("./page_elements/paypal")


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
            let logo = await driver.findElement(googleHome.logo)
            let logoDisplayed = await logo.isDisplayed().valueOf();
            assert.isTrue(logoDisplayed);

            // Check there are two options present: "Google Search" and "I'm Feeling Lucky"

            let searchButton = await driver.findElement(googleHome.googleSearch);
            let feelingLuckyButton = await driver.findElement(googleHome.feelingLucky)
            assert.equal(await searchButton.getAttribute('value'), "Google Search");
            assert.equal(await feelingLuckyButton.getAttribute('value'), "I'm Feeling Lucky")


            // Enter text "PayPal" and click "I'm Feeling Lucky"
            let searchText = await driver.findElement(googleHome.textBox);
            await searchText.sendKeys('PayPal');
            let enteredText = await searchText.getAttribute('value');
            assert.equal(enteredText, 'PayPal')
            await feelingLuckyButton.click();


            // Check the url is now "https://www.paypal.com/"
            let currentUrl = await driver.getCurrentUrl();
            assert (currentUrl.includes("https://www.paypal.com/"));   //workaround
            //assert.equal(currentUrl, "https://www.paypal.com/");    <--- this will fail as the new redirect is appends /home
            
            

            // Click "Sitemap"
            siteMapButton = (await driver).findElement(paypal.siteMap)
            siteMapButton.click();

            // Check the url is now "https://www.paypal.com/us/webapps/mpp/full-sitemap"
            currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, "https://www.paypal.com/us/webapps/mpp/full-sitemap")


            // Store all of the links on this page into a list and then print them all to system.out
            let links = await driver.findElements({tagName : 'a'})
            links.forEach(async (x)=>{
                var link = await x.getAttribute('href');
                console.log(link);
            })

            await driver.quit();
        })
    })
});