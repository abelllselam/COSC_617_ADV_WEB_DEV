const fs = require("fs");

const fileName = process.argv[2];

fs.readFile(fileName, "utf8", function (err, data) {
  const lines = data.split("\n").filter((line) => line.trim() !== "");

  const newlineCount = lines ? lines.length : 0;

  console.log("Total line(s)" + newlineCount);
});
