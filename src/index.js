import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

const isMobileDevice = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
const root = ReactDOM.createRoot(document.getElementById('root'));

if(isMobileDevice()) {
  import('./AppMobile').then(({ default: AppMobile }) => {
  root.render(
    <Auth0ProviderWithNavigate>
    <AppMobile />
  </Auth0ProviderWithNavigate>,
  
  );
  });

}else {
  
  root.render(
  
    <Auth0ProviderWithNavigate>
    <App />
  </Auth0ProviderWithNavigate>,
  
);

}





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
