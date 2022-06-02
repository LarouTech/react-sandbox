import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';


// const httpInterceptor = () => {
//   axios.interceptors.request.use(
//     (req: AxiosRequestConfig) => {
//       console.log('intercept');
      
//       return req;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };

// httpInterceptor()

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
