import './index.css';
import reportWebVitals from './reportWebVitals';
import { rerenderTree } from './render';
import state from './redux/state';

rerenderTree(state);

reportWebVitals();
