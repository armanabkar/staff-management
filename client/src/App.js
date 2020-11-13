import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <MainScreen />
      </ToastProvider>
    </Provider>
  );
}

export default App;
