import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";

import DetailSearchPanel from "../components/DetailSearchPanel";
import CourseTable from "../components/CourseTable";

export default function Home() {
  // 詳細検索条件のみ
  const [filters, setFilters] = useState({
    prefecture: "すべて",
    faculty: "すべて",
    courseGenre: "すべて",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      prefecture: filters.prefecture,
      facultyGenre: filters.faculty,
    });

    const fetchData = async () => {
      const res = await fetch(`/api/universities?${params.toString()}`);
      const data = await res.json();

      const flattened = [];
      data.forEach((uni) => {
        Object.entries(uni.faculties).forEach(([facultyName, courses]) => {
          courses.forEach((course) => {
            flattened.push({
              key: `${uni.name}_${facultyName}_${course.name}`,
              name: `${uni.name} / ${facultyName} / ${course.name}`,
              倍率: course.倍率,
            });
          });
        });
      });
      setCourses(flattened);
    };

    fetchData();
  }, [filters]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        公募推薦 志望校発見サイト
      </Typography>

      <Grid container spacing={2}>
        {/* 詳細検索パネル */}
        <Grid item xs={12} md={3}>
          <DetailSearchPanel filters={filters} setFilters={setFilters} />
        </Grid>

        {/* 結果テーブル */}
        <Grid item xs={12} md={9}>
          {courses.length > 0 ? (
            <CourseTable courses={courses} />
          ) : (
            <Typography>該当データがありません。</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}