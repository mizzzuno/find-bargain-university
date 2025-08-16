import { useState, useEffect } from "react";
import { flattenCourseData } from "../utils/dataHelpers";

/**
 * 大学データを取得し、フィルターに基づいてコースデータを管理するフック
 * @param {Object} filters - フィルター設定
 * @returns {Object} - コースデータと読み込み状態
 */
export const useCourseData = (filters) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          prefecture: filters.prefecture,
          facultyGenre: filters.faculty,
        });

        const response = await fetch(`/api/universities?${params.toString()}`);

        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }

        const data = await response.json();
        const flattened = flattenCourseData(data, filters);
        setCourses(flattened);
      } catch (err) {
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { courses, loading, error };
};
