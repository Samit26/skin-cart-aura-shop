import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AdminAuthProvider } from "../contexts/AdminAuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminAuthProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </AdminAuthProvider>
  );
}
