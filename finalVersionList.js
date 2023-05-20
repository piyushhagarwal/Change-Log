const finalVersionsArray = (sortVersionsArray) => {
  let finalVersionsArray = [];
  sortVersionsArray.forEach((element) => {
    let versionString = element.join(".");
    finalVersionsArray.push(versionString);
  });
  return finalVersionsArray;
};

module.exports = finalVersionsArray;
