/**
 * 文字列を区切り文字で分割し、空白を除去した配列を返す
 * @param {string} str - 分割する文字列
 * @param {string} delimiters - 区切り文字の正規表現パターン
 * @returns {string[]} - 分割された文字列の配列
 */
export const splitAndTrim = (str, delimiters = /[、,\/]/) => {
  if (!str) return [];
  return str
    .split(delimiters)
    .map((s) => s.trim())
    .filter(Boolean);
};

/**
 * ジャンルの配列に指定されたジャンルが含まれているかチェック
 * @param {string} genreString - チェックするジャンル文字列
 * @param {string} targetGenre - 検索するジャンル
 * @returns {boolean} - ジャンルが含まれているかどうか
 */
export const hasGenre = (genreString, targetGenre) => {
  if (!genreString || !targetGenre || targetGenre === "すべて") return true;
  return splitAndTrim(genreString).includes(targetGenre);
};

/**
 * 地域の配列に指定された都道府県が含まれているかチェック
 * @param {string} regionString - チェックする地域文字列
 * @param {string} targetPrefecture - 検索する都道府県
 * @returns {boolean} - 都道府県が含まれているかどうか
 */
export const hasRegion = (regionString, targetPrefecture) => {
  if (!regionString || !targetPrefecture || targetPrefecture === "すべて")
    return true;
  return splitAndTrim(regionString).includes(targetPrefecture);
};

/**
 * フラット化されたコースデータを作成
 * @param {Object[]} universities - 大学データの配列
 * @param {Object} filters - フィルター設定
 * @returns {Object[]} - フラット化されたコースデータ
 */
export const flattenCourseData = (universities, filters) => {
  const flattened = [];

  universities.forEach((uni) => {
    Object.entries(uni.faculties).forEach(([facultyName, courses]) => {
      courses
        .filter((course) => hasGenre(course.genre, filters.courseGenre))
        .forEach((course) => {
          flattened.push({
            key: `${uni.name}_${facultyName}_${course.name}`,
            name: `${uni.name} / ${facultyName} / ${course.name}`,
            倍率: course.倍率,
            region: course.region || "-",
            genre: course.genre || "-",
          });
        });
    });
  });

  return flattened;
};
