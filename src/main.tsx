import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
// 使用mobx
import store from "./store";
import { Provider } from "mobx-react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider {...store}>
    <App />
  </Provider>
);
