// Layout.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
        <Outlet  />
    </div>
  );
};

export default Layout;
