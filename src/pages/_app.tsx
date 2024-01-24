import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import Layout from "./layout";
import { Provider } from "react-redux";
import { store } from "../../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <Theme> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </Theme> */}
    </Provider>
  );
}
