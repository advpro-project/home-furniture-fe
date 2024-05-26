import React, { useState } from 'react';
import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../microservice-1/Login';
import Register from '../microservice-1/Register';

function HomePage() {
    const [view, setView] = useState('home');

    let content;
    switch (view) {
        case 'login':
            content = <Login setView={setView} />;
            break;
        case 'register':
            content = <Register setView={setView} />;
            break;
        default:
            content = (
                <header id="hero-outer" className="p-4 rounded-3">
                    <div id="hero-inner" className="container">
                        <h1 className="display-4 fw-bold">🏠 HoomGroom 🛠</h1>
                        <p className="col-md-8 lead">Temukan Kesempurnaan dalam Perabotan Rumah Anda!</p>
                        <figure>
                            <figcaption className="blockquote-footer">
                                <cite title="Source Title">Kelompok A06</cite>
                            </figcaption>
                        </figure>
                    </div>
                </header>
            );
    }

    return (
        <div className="homepage">
            <Header setView={setView}/>
            <main className="homepage-main">
                {content}
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage;
