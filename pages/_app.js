// pages/_app.js
import { CssBaseline } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <div style={{ backgroundColor: "#cccccc", minHeight: "100vh" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}