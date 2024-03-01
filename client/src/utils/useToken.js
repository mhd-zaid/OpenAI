import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        return JSON.parse(tokenString);
    }

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken) => {
        if(userToken === null) {
            localStorage.removeItem("token");
            setToken(userToken);
            return;
        }
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        token,
        setToken: saveToken,
    }
}