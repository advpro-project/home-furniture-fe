import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './microservice-1/AuthRoutes';

import Example from './Example'
import NoPage from './NoPage'

//tulis routing disini, path --> url path; element --> element yang ingin dirender
//dokumentasi: https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  { path: "/", element: <Example /> },
  // { path: "*", element: <NoPage />},
  { path: "/auth/*", element: <AuthRoutes /> },
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
