import './index.css';
import reportWebVitals from './reportWebVitals';
import state, { subscribe } from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { addMessage, addPost, updateNewPostMessage, updateNewPostText } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderTree = () => {
    root.render(
    <React.StrictMode>
      <Router>
          <App state={state} 
               addPost={addPost} 
               updateNewPostText={updateNewPostText}
               addMessage={addMessage}
               updateNewPostMessage={updateNewPostMessage} />    
      </Router>
    </React.StrictMode>);
}

rerenderTree(state);

subscribe(rerenderTree)

reportWebVitals();
