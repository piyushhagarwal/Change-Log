const versionList = require("./getVersions");

versionList("/Users/piyushagarwal/Downloads/Piyush/Change Log/Documents")
  .then((files) => {
    sortVersions(files);
  })
  .catch((error) => {
    console.log(error);
  });

const sortVersions = (files) => {
  let versionArray = [];

  files.forEach((element) => {
    const myArray = element.split(".");
    let integerArray = myArray.map(Number);
    versionArray.push(integerArray);
  });

  versionArray.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return a[i] - b[i];
      }
    }
    return 0;
  });

  versionArray.reverse();
  console.log(versionArray);
};
