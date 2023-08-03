import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import ChatIcon from '@mui/icons-material/Chat';
import AuthContext from '../auth';
import { useContext } from 'react';


export default function Nav() {
  const [value, setValue] = React.useState('recents');
  let {user} = useContext(AuthContext)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Refraim"
        value="refraim"
        href='/pre-prompt'
        icon={<ChatIcon />}
      />
      <BottomNavigationAction
        label="History"
        value="history"
        href={`/history/${user.user_id || user.id}/`}
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        href={`/favorites/${user.user_id || user.id}/`}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        href={`/settings/${user.user_id || user.id}/`}
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
    </Paper>
  );
}




// import { Link } from 'react-router-dom'
// import React from 'react';


// function Nav() {
//     return (
//         <div className="nav">
//             <Link to='/'>
//                 <p>Reframe</p>
//             </Link>
//             <Link to={'/account/'}> 
//             {/* add option to navigate to account or login if user is not logged in */}
//                 <p>Account</p>
//             </Link>

//             <Link to={'/convos/'}>
//                 <p>Past Conversations</p>
//                 {/* add option to navigate to account or login if user is not logged in */}
//             </Link>
//         </div>
//     );
// }

// export default Nav;