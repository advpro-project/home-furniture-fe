import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Test from './Test'
import FurnitureListPage from './pages/FurnitureListPage';
const Urls = () => {
    return (
        <Routes>
            <Route path='test' element={<Test />} />
            <Route path='list' element={<FurnitureListPage />} />
        </Routes>
    );
};

export default Urls;