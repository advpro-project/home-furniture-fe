import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Test from './Test'

const Urls = () => {
    return (
        <Routes>
            <Route path='/test' element={<Test />} />
            <Route path='/viewProducts' element={<viewProducts />} />
        </Routes>
    );
};

export default Urls;