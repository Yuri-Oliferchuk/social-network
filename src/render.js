import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { addMessage, addPost, updateNewPostMessage, updateNewPostText } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById("root"));

export let rerenderTree = (state) => {
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
