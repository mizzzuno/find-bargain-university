import { COMPETITIVE_RATE_COLORS } from "../constants";

/**
 * 降順比較関数
 * @param {Object} a - 比較対象A
 * @param {Object} b - 比較対象B
 * @param {string} orderBy - ソートキー
 * @returns {number} - 比較結果
 */
export const descendingComparator = (a, b, orderBy) => {
  if (orderBy === "name") {
    return b.name.localeCompare(a.name);
  }
  if (orderBy === "region") {
    return (b.region || "").localeCompare(a.region || "");
  }
  return (b.倍率[orderBy] ?? 0) - (a.倍率[orderBy] ?? 0);
};

/**
 * 比較関数を取得
 * @param {string} order - ソート順序 ('asc' | 'desc')
 * @param {string} orderBy - ソートキー
 * @returns {Function} - 比較関数
 */
export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

/**
 * 安定ソート
 * @param {Array} array - ソート対象の配列
 * @param {Function} comparator - 比較関数
 * @returns {Array} - ソート済み配列
 */
export const stableSort = (array, comparator) => {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const comp = comparator(a[0], b[0]);
    if (comp !== 0) return comp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
};

/**
 * 倍率に基づいて背景色とフォントウェイトを取得
 * @param {number|undefined} rate - 倍率
 * @returns {Object} - スタイル設定
 */
export const getRateStyle = (rate) => {
  let bgcolor = "inherit";
  let fontWeight = "normal";

  if (rate === undefined) {
    bgcolor = COMPETITIVE_RATE_COLORS.LOW; // データなしも青
  } else if (rate <= 1.0) {
    bgcolor = COMPETITIVE_RATE_COLORS.LOW; // 青
    fontWeight = "bold";
  } else if (rate <= 1.5) {
    bgcolor = COMPETITIVE_RATE_COLORS.MEDIUM; // 緑
    fontWeight = "bold";
  } else {
    bgcolor = COMPETITIVE_RATE_COLORS.HIGH; // 赤
    fontWeight = "bold";
  }

  return { bgcolor, fontWeight };
};
