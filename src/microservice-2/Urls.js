import React from 'react';
import {Routes, Route} from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import FurnitureListPage from './pages/FurnitureListPage';
import ViewProducts from './viewProducts'
import ViewPromos from './viewPromos'
import ViewStatProducts from './viewStatProducts'

const Urls = () => {
    return (
        <Routes>
            <Route path='/details/:furnitureId' element={<DetailsPage />} />
            <Route path='list' element={<FurnitureListPage />} />
            <Route path='/products' element={<ViewProducts />} />
            <Route path='/promos' element={<ViewPromos />} />
            <Route path='/statProducts' element={<ViewStatProducts />} />
        </Routes>
    );
};

export default Urls;