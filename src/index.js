import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/redux-store';
import { Provider } from './storeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderTree = (state) => {
    root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />    
        </Provider>
      </Router>
    </React.StrictMode>);
}

rerenderTree(store.getState());

store.subscribe(() => {
  rerenderTree(store.getState())
})

reportWebVitals();
