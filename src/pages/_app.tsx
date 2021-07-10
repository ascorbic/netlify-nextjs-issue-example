import "../../styles/globals.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Head from "next/head";
import React from "react";

import AppContext from "../contexts/AppContext";

import type { AppProps } from "next/app";

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/ban-ts-comment */
function redirectNetlifyCms() {
  //@ts-ignore
  if (process.browser && window.netlifyIdentity) {
    //@ts-ignore
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        //@ts-ignore
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
}
/* eslint-enable */

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    redirectNetlifyCms();
  }, []);

  return (
    <>
      <Head>
        <title>Netlify Nextjs Issue Example</title>
      </Head>
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </>
  );
};
export default MyApp;
