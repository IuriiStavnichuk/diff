var fs = require('fs');

var PNGDiff = require('png-diff');

var urls=[
    "http://ya.ru",
    "http://google.com"
];

var sourceFolderName = 'source-versions/';
var targetFolderName = 'target-versions/';

var dt = new Date();
var formattedTime=dt.getFullYear() + "." + (1+dt.getMonth()) + "." + dt.getDate()+ "-" + dt.getHours()+ "." + dt.getMinutes();
var resultFolderName = 'results/'+formattedTime+'/';
fs.mkdir( resultFolderName , 0777, true, function (err) { if (err) { console.log(err);} else { console.log('Directory created >>>'); } });


for (var i in urls) {

    var screenshotName = urls[i].split('/').pop() + '.png';

    var image2Stream = fs.createReadStream(targetFolderName + screenshotName);
    PNGDiff.outputDiff(sourceFolderName + screenshotName, image2Stream, resultFolderName + screenshotName, function (err, diffMetric ) {
        if (err) throw err;
        console.log(diffMetric === 1 ? screenshotName + ': Difference detected.' : 'No difference');
    });

}
