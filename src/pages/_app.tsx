import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import Layout from "./layout";
import { Provider } from "react-redux";
import { store } from "../../store";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <Theme> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </Theme> */}
      </Provider>
    </QueryClientProvider>
  );
}
