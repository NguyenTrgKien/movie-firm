import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Globalstyle from './component/Globalstyle';
import { Provider } from 'react-redux';
import RootReducer from './store/RooReducer';
import { thunk } from 'redux-thunk'; // import redux thunk
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const store = createStore(RootReducer, applyMiddleware(thunk));
console.log(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Globalstyle>
                <App />
            </Globalstyle>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
