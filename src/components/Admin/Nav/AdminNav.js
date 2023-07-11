import React from "react";
import { ListItem } from "@mui/material";
import { logoutHandler} from '../../Utils/tools';
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";

const AdminNav = (props) => {

    const links = [
        {
            title : 'Matches',
            linkto : '/admin_matches'
        },
        {
            title : 'Players',
            linkto : '/admin_players'
        }
    ]

    const renderItems = () =>{
        return links.map(link=>(
            <Link to={link.linkto} key={link.title}>
                <ListItem button className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ))
    }

    return(
        <div>
            {renderItems()}
            <ListItem button className="admin_nav_link" onClick={()=>logoutHandler()}>
                Log Out
            </ListItem>
        </div>
    )
}

export default withRouter(AdminNav);