import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AuthRoutes from './microservice-1/AuthRoutes'

import Example from './Example'
import NoPage from './NoPage'
import Microservice2Url from './microservice-2/Urls'
import Microservice3Url from './microservice-3/Urls'
import Microservice4Url from './microservice-4/Urls'

//tulis routing disini, path --> url path; element --> element yang ingin dirender
//dokumentasi: https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  { path: "/", element: <Example /> },
  { path: "*", element: <NoPage />},
  { path: "/auth/*", element: <AuthRoutes/>},
  { path: "/microservice2/*", element:<Microservice2Url />},
  { path: "/microservice3/*", element:<Microservice3Url />},
  { path: "/microservice4/*", element:<Microservice4Url />},
]);

export default function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
