import React from "react";
import Featured from "./Featured";
import MatchesHome from "./Matches";
import MeetPlayers from "./MeetPlayers";

const Home = () =>{
    return (
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
            <MeetPlayers/>
        </div>
    )
}

export default Home;