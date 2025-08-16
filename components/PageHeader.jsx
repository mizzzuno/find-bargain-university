import React from "react";
import { OFFICIAL_DATA_LINKS } from "../constants";

const PageHeader = () => {
  return (
    <>
      <div className="top-header-row">
        <span className="top-title">東海大学 公募推薦 倍率チェッカー</span>
        <span className="top-links">
          公式倍率データ：
          {OFFICIAL_DATA_LINKS.map((link, index) => (
            <React.Fragment key={link.year}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.year}年度
              </a>
              {index < OFFICIAL_DATA_LINKS.length - 1 && " ／ "}
            </React.Fragment>
          ))}
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
    </>
  );
};

export default PageHeader;
