import React from "react";
import { Box, Typography } from "@mui/material";
import { COMPETITIVE_RATE_COLORS } from "../../constants";

const TableLegend = () => {
  const legendItems = [
    {
      color: COMPETITIVE_RATE_COLORS.LOW,
      label: "青: 倍率1倍(受験者全員合格)",
    },
    {
      color: COMPETITIVE_RATE_COLORS.MEDIUM,
      label: "緑: 倍率1.5倍",
    },
    {
      color: COMPETITIVE_RATE_COLORS.HIGH,
      label: "赤: それ以上",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 2,
        px: { xs: 2, sm: 0 },
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      {legendItems.map((item, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: item.color,
              border: "1px solid #ddd",
            }}
          />
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TableLegend;
