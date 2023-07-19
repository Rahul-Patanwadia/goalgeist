import React from "react";
import { Switch, BrowserRouter, Route} from 'react-router-dom';

// components
import Header from './components/header_footer/header';
import Footer from './components/header_footer/footer';
import Home from './components/home';
import Signin from "./components/SignIn";
import Dashboard from './components/Admin/Dashboard';
import AuthGuard from "./components/Hoc/Auth";
import AdminPlayers from './components/Admin/Players';
import AddEditPlayers from "./components/Admin/Players/AddEditPlayers";
import TheTeam from "./components/The_team";
import AdminMatches from "./components/Admin/Matches";
import AddEditMatch from "./components/Admin/Matches/addEditMatch";

//toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Routes = ({user}) => {
    return(
        <BrowserRouter>
            <Header user={user}/>
            <Switch>
                <Route path='/admin_matches' exact component={AuthGuard(AdminMatches)}/>
                <Route path='/admin_matches/add_match' exact component={AuthGuard(AddEditMatch)}/>
                <Route path='/admin_matches/edit_match/:matchid' exact component={AuthGuard(AddEditMatch)}/>
                <Route path='/admin_players/edit_player/:playerid' exact component={AuthGuard(AddEditPlayers)}/>
                <Route path='/admin_players/add_player' exact component={AuthGuard(AddEditPlayers)}/>  
                <Route path='/admin_players' exact component={AuthGuard(AdminPlayers)}/>   
                <Route path='/dashboard' exact component={AuthGuard(Dashboard)}/>
                <Route path='/' exact component={Home}/>
                <Route path='/the_team' exact component={TheTeam}/>
                <Route path='/sign_in' exact component={ props => (<Signin {...props} user={user}/>)}/>
            </Switch>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routes;