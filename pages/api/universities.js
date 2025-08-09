import universities from "../../data/universities.json";

export default function handler(req, res) {
  const { prefecture, facultyGenre } = req.query;
  let filtered = universities;

  // 都道府県でフィルタ
  if (prefecture && prefecture !== "すべて") {
    filtered = filtered.filter((u) => u.region === prefecture);
  }

  // 学部ジャンルでフィルタ
  if (facultyGenre && facultyGenre !== "すべて") {
    filtered = filtered.filter((u) =>
      Object.keys(u.faculties).includes(facultyGenre)
    );
  }

  res.status(200).json(filtered);
}