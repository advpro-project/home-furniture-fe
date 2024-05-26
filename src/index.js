import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom'

// design and icon
import './fontAwesome';
import 'bootstrap/dist/css/bootstrap.min.css';


// router import
import Register from './microservice-1/Register';
import Microservice1Url  from './microservice-1/Urls';
import HomePage from "./pages/HomePage";

import Microservice2Url from "./microservice-2/Urls";
import Microservice3Url from "./microservice-3/Urls";
import DelivRoutes from './microservice-4/DelivRoutes'

const router = createBrowserRouter([

  { path: "/", element:<Layout />, 
  children: [
    { path: "/", element:<HomePage  />},
    { path: "auth/*", element:<Microservice1Url />},
    { path: "furniture/*", element:<Microservice2Url />},
    { path: "microservice3/*", element:<Microservice3Url />},
    { path: "/delivery/*", element:<DelivRoutes />},
  ]},
  { path: "/transaction/*", element: <Microservice3Url /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App />);

reportWebVitals();