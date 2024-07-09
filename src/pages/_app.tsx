// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd/lib';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={{ token: { fontFamily: 'Arial', colorPrimary: '#228B22' }}}> {/* Substitua 'Arial' por 'xxx' ou outro valor desejado */}
    <Component {...pageProps} />
  </ConfigProvider>
);

export default MyApp;
