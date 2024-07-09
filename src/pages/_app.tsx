// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd/lib';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={{ token: { colorPrimary: '#228B22' }}}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default MyApp;
