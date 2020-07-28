import React from 'react';
import { AppProps } from 'next/app';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store';

import '../styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
};

export default wrapper.withRedux(withReduxSaga(App));
