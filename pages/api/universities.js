import universities from "../../data/universities.json";

export default function handler(req, res) {
  const { region, field } = req.query;
  let filtered = universities;

  if (region && region !== "すべて") {
    filtered = filtered.filter(u => u.region === region);
  }
  if (field && field !== "すべて") {
    filtered = filtered.filter(u => u.field === field);
  }

  res.status(200).json(filtered);
}