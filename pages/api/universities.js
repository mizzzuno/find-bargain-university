import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export default function handler(req, res) {
  const { prefecture, courseGenre } = req.query;

  const csvFilePath = path.join(process.cwd(), "data", "university_data.csv");
  const fileContent = fs.readFileSync(csvFilePath, "utf8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });

  // CSVデータを整形して、universities.jsonと同じような構造にする
  const universitiesData = {};

  records.forEach((record) => {
    const universityName = record["大学名"];
    const facultyName = record["学部名"];
    const departmentName = record["学科名"];
    const departmentGenre = record["学科ジャンル"];
    const location = record["所在地"].replace("県", ""); // '神奈川県' -> '神奈川'

    if (!universitiesData[universityName]) {
      universitiesData[universityName] = {
        name: universityName,
        region: location,
        faculties: {},
      };
    }

    if (!universitiesData[universityName].faculties[facultyName]) {
      universitiesData[universityName].faculties[facultyName] = [];
    }

    // 倍率データを整形 (2024, 2023, 2022のみ利用可能)
    const 倍率 = {
      2024: parseFloat(record["倍率_2024"]) || undefined,
      2023: parseFloat(record["倍率_2023"]) || undefined,
      2022: parseFloat(record["倍率_2022"]) || undefined,
    };

    universitiesData[universityName].faculties[facultyName].push({
      name: departmentName,
      genre: departmentGenre,
      倍率: 倍率,
    });
  });

  let filteredUniversities = Object.values(universitiesData);

  // 都道府県でフィルタリング
  if (prefecture && prefecture !== "すべて") {
    filteredUniversities = filteredUniversities.filter(
      (u) => u.region === prefecture
    );
  }

  // 学部ジャンルでフィルタリング
  if (courseGenre && courseGenre !== "すべて") {
    filteredUniversities = filteredUniversities.filter((university) => {
      // 大学内のいずれかの学部が指定されたジャンルを含むかチェック
      return Object.values(university.faculties).some((departments) =>
        departments.some((dept) => {
          // 学科ジャンルがカンマ区切りで複数ある場合を考慮
          return dept.genre
            .split(/[、,\/]/)
            .map((s) => s.trim())
            .includes(courseGenre);
        })
      );
    });
  }

  //console.log(filteredUniversities);
  res.status(200).json(filteredUniversities);
}
