import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { hasRegion, hasGenre, splitAndTrim } from "../../utils/dataHelpers";

export default function handler(req, res) {
  try {
    const { prefecture, courseGenre } = req.query;

    const csvFilePath = path.join(process.cwd(), "data", "university_data.csv");

    if (!fs.existsSync(csvFilePath)) {
      return res.status(404).json({ error: "データファイルが見つかりません" });
    }

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
      let location = record["所在地"];

      if (location === "北海道") {
        // 北海道はそのまま
      } else {
        location = location.replace(/[県府都道]/g, "");
      }

      if (!universitiesData[universityName]) {
        universitiesData[universityName] = {
          name: universityName,
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
        region: location, // 各学科ごとにregionを持たせる
        倍率: 倍率,
      });
    });

    let filteredUniversities = Object.values(universitiesData);

    // 都道府県でフィルタリング（学科単位でregionを判定）
    if (prefecture && prefecture !== "すべて") {
      filteredUniversities = filteredUniversities
        .map((u) => {
          // 各学部の学科ごとにregionでフィルタ
          const filteredFaculties = {};
          Object.entries(u.faculties).forEach(([facultyName, departments]) => {
            const filteredDepartments = departments.filter((dept) => {
              return hasRegion(dept.region, prefecture);
            });
            if (filteredDepartments.length > 0) {
              filteredFaculties[facultyName] = filteredDepartments;
            }
          });
          if (Object.keys(filteredFaculties).length > 0) {
            return { ...u, faculties: filteredFaculties };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }

    // 学部ジャンルでフィルタリング
    if (courseGenre && courseGenre !== "すべて") {
      filteredUniversities = filteredUniversities.filter((university) => {
        // 大学内のいずれかの学部が指定されたジャンルを含むかチェック
        return Object.values(university.faculties).some((departments) =>
          departments.some((dept) => {
            return hasGenre(dept.genre, courseGenre);
          })
        );
      });
    }

    res.status(200).json(filteredUniversities);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
}
