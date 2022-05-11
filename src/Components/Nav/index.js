import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';
function Nav () {
    const navigate = useNavigate();
    function getUser(){
        let user = JSON.parse(localStorage.authInfo).user;
        // console.log(user.email);
        console.log(localStorage.authInfo);
        return user.email;
    }
    
    const LogOut = () =>{
        localStorage.setItem('authInfo', null);
        navigate('/login')
    }

    return(
        <div>
            <div>{getUser()}</div>
            Khanh dep trai
            <div>
            <Button variant="contained" color="primary" onClick={LogOut}>
                Log Out
            </Button>
            </div>
            
        </div>
    )
}

export default Nav;