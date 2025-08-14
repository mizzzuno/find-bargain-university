// pages/_app.js
import { CssBaseline } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <style jsx global>{`
        body {
          background: #e0e0e0;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
