var fs = require("fs");
const dirPath = process.argv[2];
const fileExtension = process.argv[3];
const path = require("path");

// const fileNames = fs.readdirSync(dirList);
// let count = fileNames.length;

fs.readdir(dirPath, (err, files) => {
  const filteredFiles = files.filter(
    (file) => path.extname(file) === fileExtension
  );

  console.log(`Number of file(s) extension:`, filteredFiles.length);
});
// fileName.forEach((file) => {
//   count++;
// });
// console.log(count);

// const fileExtension = path.extname(fileName);
// console.log(fileExtension);
