import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./Redux/Store/store.js";
import Appinitializer from "./Redux/AppInitializer/Appinitializer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Appinitializer>
      {/* <React.StrictMode> */}
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      {/* </React.StrictMode> */}
    </Appinitializer>
  </Provider>
);
