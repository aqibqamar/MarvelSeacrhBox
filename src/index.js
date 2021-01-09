import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Album from './Album';
import ErrorBoundaryAlbum from './ErrorBoundaryAlbum';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundaryAlbum>
      <Provider store={store}>
        <Router>

          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/album/id:id" exact component={Album} />
          </Switch>

        </Router>
      </Provider>
    </ErrorBoundaryAlbum>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
