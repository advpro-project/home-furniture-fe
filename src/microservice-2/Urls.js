import React from 'react';
import {Routes, Route} from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import FurnitureListPage from './pages/FurnitureListPage';
const Urls = () => {
    return (
        <Routes>
            <Route path='details/:furnitureId' element={<DetailsPage />} />
            <Route path='list' element={<FurnitureListPage />} />
        </Routes>
    );
};

export default Urls;