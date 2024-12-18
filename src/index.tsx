import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./services/store.ts";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
)
