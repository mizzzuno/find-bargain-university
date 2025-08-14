import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
} from "@mui/material";

const YEARS = ["2022", "2023", "2024"];

function descendingComparator(a, b, orderBy) {
  if (orderBy === "name") {
    return b.name.localeCompare(a.name);
  }
  if (orderBy === "region") {
    return (b.region || "").localeCompare(a.region || "");
  }
  return (b.倍率[orderBy] ?? 0) - (a.倍率[orderBy] ?? 0);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const comp = comparator(a[0], b[0]);
    if (comp !== 0) return comp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

export default function CourseTable({ courses }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // 大学名を改行する関数
  const formatUniversityName = (name) => {
    // "大学名 / 学部名 / 学科・コース名" の形式を想定
    const parts = name.split(" / ");
    if (parts.length >= 2) {
      return (
        <span>
          <span
            className="university-line1"
            style={{
              display: "block",
            }}
          >
            {parts[0]} / {parts[1]}
          </span>
          {parts.length > 2 && (
            <span
              className="university-line2"
              style={{
                display: "block",
                color: "#666",
                marginTop: "2px",
              }}
            >
              {parts.slice(2).join(" / ")}
            </span>
          )}
          <style jsx>{`
            .university-line1 {
              font-size: 0.9rem;
            }
            .university-line2 {
              font-size: 0.85rem;
            }
            @media (max-width: 600px) {
              .university-line1 {
                font-size: 0.8rem;
              }
              .university-line2 {
                font-size: 0.75rem;
              }
            }
          `}</style>
        </span>
      );
    }
    return name;
  };

  const sortedCourses = stableSort(courses, getComparator(order, orderBy));

  return (
    <Paper
      sx={{
        backgroundColor: "#fff",
        p: { xs: 0, sm: 2 },
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ px: { xs: 2, sm: 0 } }}>
        学科・コース別 過去3年倍率比較
      </Typography>

      <div
        style={{
          overflowX: "auto",
          width: "100%",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table
          sx={{
            minWidth: 700,
            "@media (max-width: 600px)": {
              minWidth: 800,
              "& .MuiTableCell-root": {
                fontSize: "0.875rem",
                padding: "6px 4px",
                whiteSpace: "nowrap",
              },
              "& .MuiTableCell-root:first-of-type": {
                position: "sticky",
                left: 0,
                backgroundColor: "#fff",
                zIndex: 1,
                minWidth: "130px",
                maxWidth: "130px",
                fontSize: "0.8rem",
                lineHeight: 1.3,
                boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                borderRight: "1px solid #e0e0e0",
              },
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={orderBy === "name" ? order : false}
                sx={{
                  minWidth: { xs: 130, sm: 250 },
                  maxWidth: { xs: 130, sm: 300 },
                  "@media (max-width: 600px)": {
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#fff",
                    zIndex: 2,
                    boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                    borderRight: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  大学・学科・コース名
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "region" ? order : false}
                align="center"
              >
                <TableSortLabel
                  active={orderBy === "region"}
                  direction={orderBy === "region" ? order : "asc"}
                  onClick={() => handleRequestSort("region")}
                >
                  キャンパス所在地
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">ジャンル</TableCell>
              {YEARS.map((year) => (
                <TableCell
                  key={year}
                  align="center"
                  sortDirection={orderBy === year ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === year}
                    direction={orderBy === year ? order : "asc"}
                    onClick={() => handleRequestSort(year)}
                  >
                    {year}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedCourses.map((course) => (
              <TableRow key={course.key || course.name}>
                <TableCell
                  sx={{
                    minWidth: { xs: 130, sm: 250 },
                    maxWidth: { xs: 130, sm: 300 },
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    "@media (max-width: 600px)": {
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                      boxShadow: "2px 0 4px rgba(0,0,0,0.1)",
                      borderRight: "1px solid #e0e0e0",
                    },
                  }}
                >
                  {formatUniversityName(course.name)}
                </TableCell>
                <TableCell align="center">{course.region || "-"}</TableCell>
                <TableCell align="center">{course.genre || "-"}</TableCell>
                {YEARS.map((year) => {
                  const rate = course.倍率[year];
                  let bgcolor = "inherit";
                  let fontWeight = "normal";
                  if (rate === undefined) {
                    bgcolor = "#b3d8fd"; // データなしも青
                  } else if (rate <= 1.0) {
                    bgcolor = "#b3d8fd"; // 青
                    fontWeight = "bold";
                  } else if (rate <= 1.5) {
                    bgcolor = "#d0f0c0"; // 緑
                    fontWeight = "bold";
                  }
                  return (
                    <TableCell
                      key={year}
                      align="center"
                      sx={{
                        bgcolor,
                        fontWeight,
                      }}
                    >
                      {rate ?? "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}
