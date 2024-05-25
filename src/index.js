import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './microservice-1/Register';
import Login from './microservice-1/Login';
import ViewProducts from './microservice-2/viewProducts';
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // Microservice 1 - Authentication
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/products", element: <ViewProducts /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();