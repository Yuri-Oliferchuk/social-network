import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/state';

const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderTree = () => {
    root.render(
    <React.StrictMode>
      <Router>
          <App store={store}
               state={store.getState()} 
               dispatch={store.dispatch.bind(store)} />    
      </Router>
    </React.StrictMode>);
}

rerenderTree();

store.subscribe(rerenderTree)

reportWebVitals();
