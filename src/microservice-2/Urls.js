import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Test from './Test'
import DetailsPage from './pages/DetailsPage';
const Urls = () => {
    return (
        <Routes>
            <Route path='test' element={<Test />} />
            <Route path='details' element={<DetailsPage />} />
        </Routes>
    );
};

export default Urls;