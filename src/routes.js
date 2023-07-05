import React from "react";
import { Routes, BrowserRouter, Route} from 'react-router-dom';

// components
import Header from './components/header_footer/header';
import Footer from './components/header_footer/footer';
import Home from './components/home';
import Signin from "./components/SignIn";

const RoutesMain = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/sign_in' exact element={<Signin/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default RoutesMain;