const versionList = require("./getVersions");
const sortVersions = require("./sortVersions");
const finalVersionsArray = require("./finalVersionList");
const File = require("./fileHandling");

versionList("/Users/piyushagarwal/Downloads/Piyush/Change Log/Documents")
  .then((files) => {
    let sortVersionsArray = sortVersions(files);
    let finalArray = finalVersionsArray(sortVersionsArray);
    main(finalArray);
  })
  .catch((error) => {
    console.log(error);
  });

const main = async (finalVersionsArray) => {
  const filePath = "ChangeLog.md";
  const f = new File(filePath);

  await f.appendToFile("## Changelog\n\n");

  for (const element of finalVersionsArray) {
    await f.appendToFile(`## [${element}]\n\n`);
  }
};
