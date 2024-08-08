import React from "react";
import { ConfigProvider } from "antd/lib";
import type { AppProps } from "next/app";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "Arial", // Substitua por 'xxx' ou outro valor desejado
        colorPrimary: "#006B3F",
        colorBorder: "#006B3F",
      },
    }}
  >
    <Component {...pageProps} />
  </ConfigProvider>
);

export default MyApp;