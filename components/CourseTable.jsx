import React from "react";
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
import { YEARS } from "../constants";
import { stableSort, getComparator, getRateStyle } from "../utils/tableHelpers";
import { useTableSort, useScrollHint } from "../hooks/useTableInteraction";
import { UniversityNameCell } from "./table/UniversityNameCell";
import ScrollHint from "./table/ScrollHint";
import TableLegend from "./table/TableLegend";

export default function CourseTable({ courses }) {
  const { order, orderBy, handleRequestSort } = useTableSort();
  const { showScrollHint, hasScrolled, scrollContainerRef } = useScrollHint();

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

      <TableLegend />

      <div
        ref={scrollContainerRef}
        style={{
          overflowX: "auto",
          width: "100%",
          WebkitOverflowScrolling: "touch",
          position: "relative",
        }}
      >
        <ScrollHint show={showScrollHint && !hasScrolled} />
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
                  <UniversityNameCell name={course.name} />
                </TableCell>
                <TableCell align="center">{course.region || "-"}</TableCell>
                <TableCell align="center">{course.genre || "-"}</TableCell>
                {YEARS.map((year) => {
                  const rate = course.倍率[year];
                  const { bgcolor, fontWeight } = getRateStyle(rate);

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
