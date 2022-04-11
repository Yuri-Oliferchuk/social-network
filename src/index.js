import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/redux-store';

const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderTree = (state) => {
    root.render(
    <React.StrictMode>
      <Router>
          <App store={store}
               state={state} 
               dispatch={store.dispatch.bind(store)} />    
      </Router>
    </React.StrictMode>);
}

rerenderTree(store.getState());

store.subscribe(() => {
  rerenderTree(store.getState())
})

reportWebVitals();
