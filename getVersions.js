const path = require("path");
const fs = require("fs");

let versionList = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        reject("Unable to scan directory: " + err);
      } else {
        resolve(files);
      }
    });
  });
};

module.exports = versionList;
