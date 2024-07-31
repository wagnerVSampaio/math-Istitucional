import React from "react";
import { ConfigProvider } from "antd/lib";
import type { AppProps } from "next/app";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{ token: { fontFamily: "Arial", colorPrimary: "#006b3f", colorBorder: "#006b3f" } }}
  >
    {" "}
    {/* Substitua 'Arial' por 'xxx' ou outro valor desejado */}
    <Component {...pageProps} />
  </ConfigProvider>
);

export default MyApp;