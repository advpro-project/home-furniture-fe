import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './microservice-1/Register';
import Login from './microservice-1/Login';
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/furniture/*", element:<Microservice2Url />},
  { path: "/microservice3/*", element:<Microservice3Url />},
  { path: "/microservice4/*", element:<Microservice4Url />},
  { path: "/", element: <HomePage /> },

  // Microservice 1 - Authentication
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },

]);

export default function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();