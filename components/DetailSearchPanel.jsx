import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { PREFECTURES, GENRE_OPTIONS } from "../constants";

export default function DetailSearchPanel({ filters, setFilters }) {
  const handleChange = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Paper sx={{ backgroundColor: "#fff", p: 2, mb: 2 }}>
      {/* <Typography variant="h6" gutterBottom>
        詳細検索
      </Typography> */}
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: { sm: 180 }, width: "100%" }}>
          <InputLabel>都道府県</InputLabel>
          <Select
            value={filters.prefecture}
            label="都道府県"
            onChange={handleChange("prefecture")}
          >
            {PREFECTURES.map((pref) => (
              <MenuItem key={pref} value={pref}>
                {pref}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { sm: 180 }, width: "100%" }}>
          <InputLabel>学部・学科ジャンル</InputLabel>
          <Select
            value={filters.courseGenre}
            label="ジャンル"
            onChange={handleChange("courseGenre")}
          >
            {GENRE_OPTIONS.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
