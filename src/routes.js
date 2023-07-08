import React from "react";
import { Switch, BrowserRouter, Route} from 'react-router-dom';

// components
import Header from './components/header_footer/header';
import Footer from './components/header_footer/footer';
import Home from './components/home';
import Signin from "./components/SignIn";

//toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Routes = ({user}) => {
    return(
        <BrowserRouter>
            <Header user={user}/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/sign_in' exact component={Signin}/>
            </Switch>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routes;