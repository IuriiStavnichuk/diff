var webdriver = require('selenium-webdriver');
var fs = require('fs');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
    return driver.takeScreenshot().then(function(data) {
        fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
            if(err) throw err;
        });
    })
};

// example usage
var urls=[
    "http://uplay.ubi.com",
    "http://shop.ubi.com",
    "http://uplay.ubi.com/#!/en-GB/games",
    "http://uplay.ubi.com/#!/en-GB/profile/kasakmamay",
    "https://account-uplay.ubi.com/en-US",
    "https://account-uplay.ubi.com/en-GB/account",
    "https://account-uplay.ubi.com/en-GB/contact-prefs"
];


for (var i in urls) {

    var folderName= 'source-versions/';
    //var folderName= 'test/target-versions/';
    //var screenshotName= urls[i].split('/').pop()+'.png';

    var screenshotName= urls[i].replace("http://","");
    screenshotName= screenshotName.replace("https://","");
    screenshotName= screenshotName.replace("/#!/","");
    screenshotName= screenshotName.split('/').join('_')+'.png';

    driver.get(urls[i]);
    driver.saveScreenshot(folderName+screenshotName);
}

driver.quit();