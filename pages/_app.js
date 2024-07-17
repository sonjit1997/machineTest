import React from "react";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SSRProvider } from "react-bootstrap";

function App({ Component, pageProps}) {
  return (
    <SSRProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default App;
