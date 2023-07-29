import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore"; 
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const LeagueTable = () =>{

    const [positions, setPositions] = useState(null);

    const fetchData = async() =>{
        const querySnapshot = await getDocs(collection(db, "positions"));
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
        });
        setPositions(result)
    }

    const showTeamPositions = () =>{
         return positions?
            positions.map((pos,idx)=>(
                <TableRow key={idx}>
                    <TableCell>{idx+1}</TableCell>
                    <TableCell>{pos.team}</TableCell>
                    <TableCell>{pos.w}</TableCell>
                    <TableCell>{pos.d}</TableCell>
                    <TableCell>{pos.l}</TableCell>
                    <TableCell>{pos.pts}</TableCell>
                </TableRow>
            ))
        : null
    }

    useEffect(()=>{
        if(!positions){
            fetchData();
        }
    },[positions])

    return(
        <div className="league_table_wrapper">
            <div className="title">
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showTeamPositions()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LeagueTable;