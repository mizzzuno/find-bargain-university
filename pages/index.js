import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

import DetailSearchPanel from "../components/DetailSearchPanel";
import CourseTable from "../components/CourseTable";
import PageHeader from "../components/PageHeader";
import { DEFAULT_FILTERS } from "../constants";
import { useCourseData } from "../hooks/useCourseData";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { courses, loading, error } = useCourseData(filters);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader />

      <Grid container spacing={2} direction="column" alignItems="center">
        {/* 詳細検索パネル */}
        <Grid size={{ xs: 12 }} sx={{ maxWidth: 600, width: "100%" }}>
          <DetailSearchPanel filters={filters} setFilters={setFilters} />
        </Grid>

        {/* 結果テーブル */}
        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : courses.length > 0 ? (
            <CourseTable courses={courses} />
          ) : (
            <Typography>該当データがありません。</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
