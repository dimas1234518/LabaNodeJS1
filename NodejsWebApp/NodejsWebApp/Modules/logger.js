const fs = require("fs");

var currentDate = new Date();

module.exports.writeLog = function writeLog(message, logPath) {
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var data = `${hour}:${minutes}:${seconds} message: ${message}}`;

    console.log(data);

    fs.appendFile(logPath, data + "\n", function () { });
};