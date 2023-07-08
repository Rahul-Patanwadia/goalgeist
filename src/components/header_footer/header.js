import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { CityLogo, showToastError, showToastSuccess } from "../Utils/tools";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Header = ({user}) =>{

    const logoutHandler = () =>{
        signOut(auth).then(()=>{
            showToastSuccess('Signed Out!')
        }).catch(err=>{
            showToastError(err.message)
        })
    }

    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor:'#98c5e9',
                boxShadow:'none',
                padding:'10px 0px',
                borderBottom:'2px solid #00285e'
            }}
        >
            <Toolbar style={{display:'flex'}}>
                <div style={{flexGrow:1}}>
                    <div className="header_logo">
                        <CityLogo
                            link={true}
                            linkto='/'
                            height='70px'
                            width='70px'
                        />
                    </div>
                </div>

                <Link to='/the_team'>
                    <Button color="inherit"> The Team </Button>
                </Link>

                <Link to='/the_matches'>
                    <Button color="inherit"> Matches </Button>
                </Link>

                {
                    user?
                    <>
                        <Link to='/dashboard'>
                            <Button color="inherit"> Dashboard </Button>
                        </Link>
                        <Button color="inherit" onClick={()=>logoutHandler()}> Log out</Button>
                    </>
                    
                    :
                    null
                }
                
            </Toolbar>
        </AppBar>
    )
}

export default Header;