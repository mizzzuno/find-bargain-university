import React from "react";
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const allPrefectures = [
  "すべて",
  "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島",
  "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川",
  "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜",
  "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫",
  "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口",
  "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎",
  "熊本", "大分", "宮崎", "鹿児島", "沖縄",
];

const faculties = [
  "すべて",
  "文学系",
  "教育学系",
  "法学系",
  "経済学系",
  "商学系",
  "理学系",
  "工学系",
  "農学系",
  "医学系",
  "歯学系",
  "薬学系",
  "看護学系",
  "社会学系",
  "外国語学系",
  "芸術学系",
  "情報学系",
  "環境学系",
  "人間学系",
  "スポーツ学系",
];

export default function DetailSearchPanel({ filters, setFilters }) {
  const handleChange = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        詳細検索
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>都道府県</InputLabel>
        <Select value={filters.prefecture} label="都道府県" onChange={handleChange("prefecture")}>
          {allPrefectures.map((pref) => (
            <MenuItem key={pref} value={pref}>
              {pref}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>学部・学科</InputLabel>
        <Select value={filters.faculty} label="系" onChange={handleChange("faculty")}>
          {faculties.map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}