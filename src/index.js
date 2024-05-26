import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

// design and icon
import './fontAwesome';
import 'bootstrap/dist/css/bootstrap.min.css';


// router import
import Register from './microservice-1/Register';
import Login from './microservice-1/Login';

import HomePage from "./pages/HomePage";

import Microservice2Url from "./microservice-2/Urls";
import Microservice3Url from "./microservice-3/Urls";
import DelivRoutes from './microservice-4/DelivRoutes'

const router = createBrowserRouter([
  { path: "/furniture/*", element:<Microservice2Url />},
  { path: "/microservice3/*", element:<Microservice3Url />},
  { path: "/delivery/*", element:<DelivRoutes />},
  { path: "/", element: <HomePage /> },
  // Microservice 1 - Authentication
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },
  // Microservice 2 - Products and Promos
  { path: "/products", element: <ViewProducts /> },
  { path: "/promos", element: <ViewPromos /> },
  { path: "/stats", element: <ViewStatProducts /> },
]);

export default function App() {
  return (
  <div>
    <RouterProvider router={router} />;
  </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();