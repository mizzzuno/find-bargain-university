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
          courses
            .filter((course) => {
              if (filters.courseGenre === "すべて") return true;
              // ジャンルを「/」で分割し、いずれかが一致すればOK
              return course.genre
                .split(/[、,\/]/)
                .map((s) => s.trim())
                .includes(filters.courseGenre);
            })
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
      setCourses(flattened);
      console.log(data);
    };

    fetchData();
  }, [filters]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div className="top-header-row">
        <span className="top-title">東海大学 公募推薦 倍率チェッカー</span>
        <span className="top-links">
          公式倍率データ：
          <a
            href="/data/official_data/2022.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2022年度
          </a>{" "}
          ／
          <a
            href="/data/official_data/2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2023年度
          </a>{" "}
          ／
          <a
            href="/data/official_data/2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2024年度
          </a>
        </span>
      </div>
      <style jsx>{`
        .top-header-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.2rem;
          flex-direction: column;
          align-items: flex-start;
        }
        .top-title {
          font-size: 2rem;
          font-weight: bold;
          white-space: nowrap;
        }
        .top-links {
          font-size: 1.1rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.3rem;
        }
        .top-links a {
          font-size: 1.05rem;
        }
        @media (max-width: 600px) {
          .top-header-row {
            flex-direction: row;
            gap: 0.4rem;
            align-items: center;
          }
          .top-title {
            font-size: 1.3rem;
          }
          .top-links {
            font-size: 0.9rem;
          }
          .top-links a {
            font-size: 0.9rem;
          }
        }
      `}</style>

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
