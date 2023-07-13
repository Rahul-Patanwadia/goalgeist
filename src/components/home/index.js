import React from "react";
import Featured from "./Featured";
import MatchesHome from "./Matches";

const Home = () =>{
    return (
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
        </div>
    )
}

export default Home;