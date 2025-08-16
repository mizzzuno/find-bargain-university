// アプリケーション全体で使用する定数
export const YEARS = ["2022", "2023", "2024"];

export const PREFECTURES = [
  "すべて",
  "北海道",
  "東京",
  "神奈川",
  "静岡",
  "熊本",
];

export const GENRE_OPTIONS = [
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

export const COMPETITIVE_RATE_COLORS = {
  LOW: "#b3d8fd", // 青: 倍率1倍(受験者全員合格)
  MEDIUM: "#d0f0c0", // 緑: 倍率1.5倍以下
  HIGH: "#ffcccb", // 赤: 倍率1.5倍超
};

export const DEFAULT_FILTERS = {
  prefecture: "すべて",
  faculty: "すべて",
  courseGenre: "すべて",
};

export const OFFICIAL_DATA_LINKS = [
  { year: "2022", url: "/data/official_data/2022.pdf" },
  { year: "2023", url: "/data/official_data/2023.pdf" },
  { year: "2024", url: "/data/official_data/2024.pdf" },
];
