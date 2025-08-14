import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

const allPrefectures = [
  "すべて",
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
];

const genreOptions = [
  "すべて",
  "体育",
  "健康",
  "化学",
  "国際",
  "宇宙",
  "工学",
  "建築",
  "心理",
  "情報",
  "政治",
  "教育",
  "教養",
  "数学",
  "文学",
  "文理融合",
  "機械",
  "歴史",
  "法学",
  "海洋",
  "物理",
  "生物",
  "看護",
  "社会",
  "経営",
  "経済",
  "芸術",
  "観光",
  "農学",
  "電気電子",
];

export default function DetailSearchPanel({ filters, setFilters }) {
  const handleChange = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Paper sx={{ backgroundColor: "#fff", p: 2, mb: 2 }}>
      {/* <Typography variant="h6" gutterBottom>
        詳細検索
      </Typography> */}
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: { sm: 180 }, width: "100%" }}>
          <InputLabel>都道府県</InputLabel>
          <Select
            value={filters.prefecture}
            label="都道府県"
            onChange={handleChange("prefecture")}
          >
            {allPrefectures.map((pref) => (
              <MenuItem key={pref} value={pref}>
                {pref}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { sm: 180 }, width: "100%" }}>
          <InputLabel>学部・学科ジャンル</InputLabel>
          <Select
            value={filters.courseGenre}
            label="ジャンル"
            onChange={handleChange("courseGenre")}
          >
            {genreOptions.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
