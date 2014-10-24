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
driver.saveScreenshot('mypage.png');

var urls=[
    "http://ya.ru",
    "http://google.com",
]

for (var i in urls) {

    //var folderName= 'screenshots-for-processing/source-versions/';
    var folderName= 'screenshots-for-processing/target-versions/';
    var screenshotName= urls[i].split('/').pop()+'.png';

    driver.get(urls[i]);
    driver.saveScreenshot(folderName+screenshotName);
}

driver.quit();