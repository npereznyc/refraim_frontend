import { Link } from 'react-router-dom'
import React from 'react';


function Nav() {
    return (
        <div className="nav">
            <Link to='/'>
                <p>Reframe</p>
            </Link>
            <Link to={'/account/'}> 
            {/* add option to navigate to account or login if user is not logged in */}
                <p>Account</p>
            </Link>

            <Link to={'/convos/'}>
                <p>Past Conversations</p>
                {/* add option to navigate to account or login if user is not logged in */}
            </Link>
        </div>
    );
}

export default Nav;