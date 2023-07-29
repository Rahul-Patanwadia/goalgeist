import React, {useEffect,useReducer,useState} from "react";

//components
import MatchesList from "./MatchesList";
import LeagueTable from "./tables";

import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../../firebase';
import { CircularProgress } from "@mui/material";

const TheMatches = () =>{

    const [matches,setMatches] = useState(null);

    const fetchData = async() =>{
        const querySnapshot = await getDocs(collection(db, "matches"));
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
        });
        setMatches(result)
    }

    useEffect(()=>{
        if(!matches){
            fetchData();
        }
    },[matches])

    return(
        <div>
            {matches?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                            
                        </div>
                        <div className="right">
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
            :
                <div className="progress">
                    <CircularProgress/>
                </div>
            }
        </div>
    )
}

export default TheMatches;