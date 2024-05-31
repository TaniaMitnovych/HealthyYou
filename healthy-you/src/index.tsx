import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
serviceWorkerRegistration.unregister();
reportWebVitals();
