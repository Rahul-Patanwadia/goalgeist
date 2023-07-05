import React from "react";
import { Routes, BrowserRouter, Route} from 'react-router-dom';

// components
import Header from './components/header_footer/header';
import Footer from './components/header_footer/footer';
import Home from './components/home';

const RoutesMain = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' exact element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default RoutesMain;