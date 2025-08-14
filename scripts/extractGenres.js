const fs = require("fs");
const csv = require("csv-parser");

const genres = new Set();

fs.createReadStream("./data/university_data.csv") // CSVファイルのパスを適宜変更
  .pipe(csv())
  .on("data", (row) => {
    // "学科ジャンル" カラム名をCSVに合わせて変更してください
    const genreField = row["学科ジャンル"];
    if (genreField) {
      genreField.split(/[、,]/).forEach((g) => {
        const trimmed = g.trim();
        if (trimmed) genres.add(trimmed);
      });
    }
  })
  .on("end", () => {
    const genreArray = Array.from(genres);
    genreArray.sort();
    console.log(JSON.stringify(["すべて", ...genreArray], null, 2));
  });
