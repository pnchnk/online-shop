import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import store, {persistor} from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import './firebase';


const container = document.getElementById('root')!
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>     
          <Router>
            <App />
          </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
