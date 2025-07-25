import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
