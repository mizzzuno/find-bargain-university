import React from "react";

/**
 * 大学名を改行して表示するコンポーネント
 * @param {string} name - "大学名 / 学部名 / 学科・コース名" の形式の文字列
 */
export const UniversityNameCell = ({ name }) => {
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
