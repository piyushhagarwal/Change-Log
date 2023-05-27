const fs = require("fs");

const openFile = (fileName) => {
  fs.open(fileName, "w", (err) => {
    if (err) throw err;
  });
  return true;
};

const appendToFile = (fileName, content) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deleteFile = (fileName) => {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
  });
  return true;
};

//This function reads all the content of a given file, stores it in a variable and returns it
const readMarkdownFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//It checks whether a file with given name is present or not
const checkFileExists = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false); // File does not exist
      } else {
        resolve(true); // File exists
      }
    });
  });
};

module.exports = {
  openFile,
  appendToFile,
  deleteFile,
  readMarkdownFile,
  checkFileExists,
};
