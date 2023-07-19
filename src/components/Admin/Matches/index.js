import React, { useEffect, useState } from "react";
import AdminLayout from '../../Hoc/AdminLayout'
import { query, limit, collection, getDocs, startAfter } from "firebase/firestore"; 
import { db } from "../../../firebase";
import { Button, Table, TableCell, TableHead, TableRow, Paper, TableBody, CircularProgress } from "@mui/material";
import { showToastError } from "../../Utils/tools";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminMatches = () =>{

    const [matches,setMatches] = useState(null);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async() =>{
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, limit(2));
        const result = []
        const querySnapshot = await getDocs(q);
        let lastVisible = null

        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
            lastVisible = doc
        });
        setMatches(result)
        setLastVisible(lastVisible)
        setLoading(false)
    }

    useEffect(()=>{
        if(!matches){
            setLoading(true)
            fetchData();
        }
    },[matches])
    
    const fetchDataAgain = async() =>{
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, startAfter(lastVisible), limit(2));
        const result = []
        const querySnapshot = await getDocs(q);
        let newLastVisible = null

        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()});
            newLastVisible = doc
        });
        setMatches([...matches,...result])
        setLastVisible(newLastVisible)
        setLoading(false)
    }

    const loadMoreMatches = () =>{
        if(lastVisible){
            setLoading(true)
            fetchDataAgain();
        }
        else{
            showToastError('nothing to load')
        }
    }

    return(
        <AdminLayout title='Matches'>
            <div className="mb-5">
                <Button
                    disableElevation
                    variant="outlined"
                    to={'/admin_matches/add_match'}
                    component={Link}
                >
                    Add Match
                </Button>
            </div>

            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Match</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Final</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {matches? 
                            matches.map(match=>(
                                <TableRow key={match.id}>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.date}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                                            {match.away} <strong>-</strong> {match.local}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                                    </TableCell>
                                    <TableCell>
                                            {match.final==='Yes'?
                                                <span className="matches_tag_red">
                                                    Final
                                                </span>
                                            :
                                                <span className="matches_tag_green">
                                                    Not played yet
                                                </span>
                                            }
                                    </TableCell>
                                </TableRow>
                            ))
                        : null}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                onClick={()=>loadMoreMatches()}
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

export default AdminMatches;