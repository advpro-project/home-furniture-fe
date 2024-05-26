// Layout.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
        <main>
        <Outlet  />
        </main>
        <Footer />
    </div>
  );
};

export default Layout;
