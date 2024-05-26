import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {

    let content;
    
    content = (
        <header id="hero-outer" className="p-4 rounded-3">
            <div id="hero-inner" className="container">
                <h1 className="display-4 fw-bold text-center mt-16">🏠 HoomGroom 🛠</h1>
                <p className="lead text-center">Temukan Kesempurnaan dalam Perabotan Rumah Anda!</p>
                <figure>
                    <figcaption className="blockquote-footer mt-3 mb-96 text-center">
                        <cite title="Source Title">Kelompok A06</cite>
                    </figcaption>
                </figure>
            </div>
        </header>
    );

    return (
        <div className="homepage">
            {content}
            <Footer />
        </div>
    );
}

export default HomePage;
