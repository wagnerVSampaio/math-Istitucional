import React from "react";
import { ConfigProvider } from "antd/lib";
import type { AppProps } from "next/app";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{ token: { fontFamily: "Arial", colorPrimary: "#228B22", colorBorder: "#228B22" } }}
  >
    {" "}
    {/* Substitua 'Arial' por 'xxx' ou outro valor desejado */}
    <Component {...pageProps} />
  </ConfigProvider>
);

export default MyApp;
