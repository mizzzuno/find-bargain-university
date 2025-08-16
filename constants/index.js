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

  // 工学・技術系
  "工学",
  "機械",
  "電気電子",
  "建築",
  "情報",
  "宇宙",

  // 理学・自然科学系
  "数学",
  "物理",
  "化学",
  "生物",
  "海洋",
  "農学",

  // 人文・社会系
  "文学",
  "歴史",
  "法学",
  "政治",
  "経済",
  "経営",
  "社会",
  "国際",
  "教育",
  "教養",

  // 健康・スポーツ系
  "体育",
  "健康",
  "看護",

  // その他専門分野
  "心理",
  "芸術",
  "観光",
  "文理融合",
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
