var fs = require("fs");
const lodash = require("lodash");
const fileName = process.argv[2];

fs.readFile(fileName, "utf8", function (err, data) {
  let jsonData = JSON.parse(data);
  // let newArray = [];
  // part one of the third question
  console.log("part 1:");
  // jsonData.forEach((element) => {
  //   newArray.push(element.username);
  // console.log(element.username);
  let usernames = lodash.map(jsonData, (element) => element.username);

  console.log(usernames);
  console.log("--------------------");

  // part two of the third question grouping by username
  console.log("Part 2:");
  const groupedItems = lodash.groupBy(jsonData, "username");
  console.log(groupedItems);
  console.log("--------------------");
  // Part three of the third question returning only the unique usernames
  console.log("Part 3:");
  const uniqueItems = lodash.uniq(usernames);
  console.log(uniqueItems);
  console.log("--------------------");

  //Part Four of the fourth question returning the original JSON object with usernames in ascending order
  console.log("Part 4:");
  let sortedUsernames = lodash.orderBy(jsonData, ["username"], ["asc"]);
  console.log(sortedUsernames);
  console.log("--------------------");
});
