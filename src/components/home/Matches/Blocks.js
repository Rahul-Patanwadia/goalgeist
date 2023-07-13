import React, { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../../firebase";
import MatchesBlock from "../../Utils/matches_block";

const Blocks = () =>{

    const [matches,setMatches] = useState([]);

    const fetchData = async () =>{
        const matches_temp = []
        const querySnapshot = await getDocs(collection(db, "matches"));
        querySnapshot.forEach((doc) => {
            matches_temp.push({id:doc.id,...doc.data()})
        });
        setMatches(matches_temp);
    }

    useEffect(()=>{
        if(!(matches.length>0))
        {
            fetchData();
        }
    },[matches]);

    const showMatches = (matches) =>(
        matches?
            matches.map(match=>(
                <Slide bottom key={match.id} className="item" triggerOnce>
                    <div>
                        <div className="wrapper">
                            <MatchesBlock match={match}/>
                        </div>
                    </div>
                </Slide>
            ))
        :
        null
    )

    return(
        <div className="home_matches">
            {showMatches(matches)}
        </div>
    )
}

export default Blocks;