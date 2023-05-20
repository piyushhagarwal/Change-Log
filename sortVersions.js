const sortVersions = (files) => {
  let versionArray = [];

  files.forEach((element) => {
    const myArray = element.split("."); //This will split the string into an array "2.1.2" -> ["2","1","2"]
    let integerArray = myArray.map(Number); //This will make all the string elements of the array to numbers ["2","1","2"] -> [2,1,2]
    versionArray.push(integerArray);
  });
  //This will create an array of array

  versionArray.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return a[i] - b[i];
      }
    }
    return 0;
  });
  //This will sort the array

  return versionArray.reverse(); //This will reverse the array
};

module.exports = sortVersions;
