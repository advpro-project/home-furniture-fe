import React from 'react';
import {Routes, route, Route} from 'react-router-dom'
import BuyProduct from './pages/BuyProduct';
import TransactionList from './pages/TransactionList';
import TopUp from './pages/TopUp';
const Urls = () => {
    return (
        <Routes>
            <Route path='buy' element={<BuyProduct />} />
            <Route path='lists' element={<TransactionList />} />
            <Route path='top-up' element={<TopUp />} />
        </Routes>
    );
};

export default Urls;