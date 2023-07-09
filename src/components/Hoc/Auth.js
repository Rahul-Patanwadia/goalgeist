import React from "react";
import { Redirect } from "react-router-dom";
import {auth} from '../../firebase'

const AuthGuard = (Component) =>{
    class AuthHoc extends React.Component{

        authCheck = () =>{
            const user = auth.currentUser;
            if(user) return <Component/>;
            return <Redirect to='/'/>;
        }

        render(){
            return this.authCheck();
        }
    }
    return AuthHoc;
}

export default AuthGuard;