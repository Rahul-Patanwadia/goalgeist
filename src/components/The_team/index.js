import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../../firebase';
import { CircularProgress } from "@mui/material";
import { Slide } from "react-awesome-reveal";
import PlayerCard from '../Utils/playercard'

const TheTeam = () =>{

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);

    const fetchData = async() =>{
        const querySnapshot = await getDocs(collection(db, "players"));
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data(),url:''})
        });

        result.forEach((player,idx)=>{
            let fname = player.name.replace(' ','_');
            let lname = player.lastname.replace(' ','_')
            let playerUrl = `${fname}_${lname}`;
            playerUrl.toLowerCase();
            result[idx].url = `/images/headshots/${playerUrl}.png`
        })

        setPlayers(result)
        setLoading(false)
    }

    useEffect(()=>{
        if(!players){
            fetchData()
        }
    },[players])

    const showPlayersByCategory = (category) =>(
        players?
            players.map((player,i)=>{
                    return player.position === category?
                        <div>
                            <Slide left key={player.id} triggerOnce>
                                <div className="item">
                                    <PlayerCard 
                                        number={player.number}
                                        name={player.name}
                                        lastname={player.lastname}
                                        bck={player.url}
                                    />
                                </div>
                            </Slide>
                        </div>
                    : null
            })
        : null
    )

    return(
        <div className="the_team_container">
            {loading?
                <div className="progress">
                    <CircularProgress/>
                </div>
            :
                <div>
                    <div className="team_category_wrapper">
                        <div className="title">Keepers</div>
                        <div className="team_cards">
                            {showPlayersByCategory('Keeper')}
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Defence</div>
                        <div className="team_cards">
                            {showPlayersByCategory('Defence')}
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Midfield</div>
                        <div className="team_cards">
                            {showPlayersByCategory('Midfield')}
                        </div>
                    </div>

                    <div className="team_category_wrapper">
                        <div className="title">Strikers</div>
                        <div className="team_cards">
                            {showPlayersByCategory('Striker')}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TheTeam;