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

  const sortedCourses = stableSort(courses, getComparator(order, orderBy));

  return (
    <Paper sx={{ backgroundColor: "#fff", p: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        学科・コース別 過去3年倍率比較
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === "name" ? order : false}>
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
              <TableCell>{course.name}</TableCell>
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
    </Paper>
  );
}
