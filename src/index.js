import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Spotlight from "./components/spotlight-search/Spotlight";

library.add(faSearch);
// import * as serviceWorker from './serviceWorker';

document.getElementById('root').style.height = window.innerHeight;
ReactDOM.render([<App />, <Spotlight /> ], document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
