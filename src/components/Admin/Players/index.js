import React, { useEffect, useState } from "react";
import AdminLayout from '../../Hoc/AdminLayout'
import { query, limit, collection, getDocs, startAfter } from "firebase/firestore"; 
import { db } from "../../../firebase";
import { Button, Table, TableCell, TableHead, TableRow, Paper, TableBody, CircularProgress } from "@mui/material";
import { showToastError } from "../../Utils/tools";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminPlayers = () =>{

    const [players,setPlayers] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async() =>{
        const playersRef = collection(db, "players");
        const q = query(playersRef, limit(2));
        const result = []
        const querySnapshot = await getDocs(q);
        let lastVisible = null

        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
            lastVisible = doc
        });
        setPlayers(result)
        setLastVisible(lastVisible)
        setLoading(false)
    }

    useEffect(()=>{
        if(!players){
            setLoading(true)
            fetchData();
        }
    },[players])
    
    const fetchDataAgain = async() =>{
        const playersRef = collection(db, "players");
        const q = query(playersRef, startAfter(lastVisible), limit(2));
        const result = []
        const querySnapshot = await getDocs(q);
        let newLastVisible = null

        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
            newLastVisible = doc
        });
        setPlayers([...players,...result])
        setLastVisible(newLastVisible)
        setLoading(false)
    }

    const loadMorePlayers = () =>{
        if(lastVisible){
            setLoading(true)
            fetchDataAgain();
        }
        else{
            showToastError('nothing to load')
        }
    }

    return(
        <AdminLayout title='The Players'>
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    to={'/admin_players/add_player'}
                    component={Link}
                >
                    Add Player
                </Button>
            </div>

            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {players ? 
                            players.map(player=>(
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/edit_player/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link>
                                            {player.number}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link>
                                            {player.position}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        : null}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                onClick={()=>loadMorePlayers()}
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Load more
            </Button>

            <div className="admin_progress">
                {loading?
                    <CircularProgress 
                        style={{
                            color:"#98c5e9"
                        }}
                        thickness={7}
                    />
                : null}
            </div>

        </AdminLayout>
    )
}

export default AdminPlayers;