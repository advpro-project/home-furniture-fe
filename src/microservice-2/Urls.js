import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Test from './Test'
import ViewProducts from './viewProducts'
import ViewPromos from './viewPromos'
import ViewStatProducts from './viewStatProducts'

const Urls = () => {
    return (
        <Routes>
            <Route path='/test' element={<Test />} />
            <Route path='/products' element={<ViewProducts />} />
            <Route path='/promos' element={<ViewPromos />} />
            <Route path='/statProducts' element={<ViewStatProducts />} />
        </Routes>
    );
};

export default Urls;