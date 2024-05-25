import React from 'react';
import NavBar from './NavBar';

function Header({ setView }) {
    return (
        <header>
            <NavBar setView={setView} />
        </header>
    );
}

export default Header;
