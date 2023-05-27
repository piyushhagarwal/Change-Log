const versionList = require("./getVersions");
const sortVersions = require("./sortVersions");
const finalVersionsArray = require("./finalVersionList");
const {
  openFile,
  appendToFile,
  deleteFile,
  readMarkdownFile,
  checkFileExists,
} = require("./fileHandling");

const folderPath = "/Users/piyushagarwal/Downloads/Piyush/Change Log/Documents";

versionList(folderPath)
  .then((files) => {
    const onlyVersions = []; // This is the array of versions without the about.md or about.toml file
    files.forEach((element) => {
      if (
        checkStringPresence(element, ".toml") ||
        checkStringPresence(element, ".md")
      ) {
      } else {
        onlyVersions.push(element);
      }
    });
    let sortVersionsArray = sortVersions(onlyVersions);
    let finalArray = finalVersionsArray(sortVersionsArray);
    main(finalArray);
  })
  .catch((error) => {
    console.log(error);
  });

//It checks whether a substring is present in a main string
const checkStringPresence = (mainString, searchString) => {
  return mainString.includes(searchString);
};

const main = async (finalVersionsArray) => {
  const filePath = "ChangeLog.md";

  openFile(filePath);

  //Delete the previous ChangeLog file if it exists
  if (await checkFileExists(`${folderPath}/${filePath}`)) {
    deleteFile(filePath);
  }

  //This function checks a version and write all the contents(added.md,fxed.md,etc) of that version into the change log file
  const updateFile = async (versionNumber, Filetype) => {
    if (await checkFileExists(`${folderPath}/${versionNumber}/${Filetype}`)) {
      const fileContent = await readMarkdownFile(
        `${folderPath}/${versionNumber}/${Filetype}`
      );
      await appendToFile(filePath, `${fileContent}\n`);
    }
  };

  await appendToFile(filePath, "## Changelog\n");
  const aboutContent = await readMarkdownFile(`${folderPath}/about.md`);
  await appendToFile(filePath, `\n${aboutContent}`); // Appends the about content of the software to the change log file

  //It loops over all the versions folder and add its content to the change log file
  for (const element of finalVersionsArray) {
    await appendToFile(filePath, `\n## [${element}]\n\n`);
    await updateFile(element, "Added.md");
    await updateFile(element, "Fixed.md");
    await updateFile(element, "Changed.md");
    await updateFile(element, "Removed.md");
  }
};
