import React from "react";
import { Box } from "@mui/material";

const ScrollHint = ({ show }) => {
  if (!show) return null;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          right: "15px",
          zIndex: 1000,
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          gap: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "25px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          pointerEvents: "none",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(4px)",
        }}
      >
        <span>右にスワイプ</span>
        <span
          style={{
            display: "inline-block",
            animation: "arrowBounce 1.5s ease-in-out infinite",
            marginLeft: "4px",
            fontSize: "1rem",
          }}
        >
          👉
        </span>
      </Box>
      <style>
        {`
          @keyframes arrowBounce {
            0%, 100% { 
              transform: translateX(0px);
            }
            50% { 
              transform: translateX(8px);
            }
          }
        `}
      </style>
    </>
  );
};

export default ScrollHint;
