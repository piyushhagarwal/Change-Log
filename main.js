const versionList = require("./getVersions");
const sortVersions = require("./sortVersions");
const finalVersionsArray = require("./finalVersionList");
const File = require("./fileHandling");
const fs = require("fs");

const folderPath = "/Users/piyushagarwal/Downloads/Piyush/Change Log/Documents";

versionList(folderPath)
  .then((files) => {
    let sortVersionsArray = sortVersions(files);
    let finalArray = finalVersionsArray(sortVersionsArray);
    main(finalArray);
  })
  .catch((error) => {
    console.log(error);
  });

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

const main = async (finalVersionsArray) => {
  const filePath = "ChangeLog.md";
  const f = new File(filePath);

  const updateFile = async (versionNumber, Filetype) => {
    if (await checkFileExists(`${folderPath}/${versionNumber}/${Filetype}`)) {
      const fileContent = await readMarkdownFile(
        `${folderPath}/${versionNumber}/${Filetype}`
      );
      await f.appendToFile(`${fileContent}\n`);
    }
  };

  await f.appendToFile("## Changelog\n");

  for (const element of finalVersionsArray) {
    await f.appendToFile(`\n## [${element}]\n\n`);
    await updateFile(element, "Added.md");
    await updateFile(element, "Fixed.md");
    await updateFile(element, "Changed.md");
    await updateFile(element, "Removed.md");
  }
};
