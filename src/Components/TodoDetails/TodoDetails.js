import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoDetails () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todo, setTodo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded){
            loadTodoDetails();
        }
    }, [isLoaded]);

    function loadTodoDetails () {
        const authString = localStorage.getItem("authInfo");
        const accessToken = authString && JSON.parse(authString).accessToken;
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        axios
        .get("http://localhost:3000/lists/list/"  + {headers})
        .then((res) => {
            setIsLoaded(true);
            setTodo(res);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        );
    }
    
    if( error) {
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded) {
        return <div>Loading...</div>;
    }else {
        return (
            <div>
                {loadTodoDetails}
            </div>
        )
    }
}