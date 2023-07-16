import {React,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const Navigate = useNavigate();

    useEffect(() => {
        console.log("logout");
        //localStorage.removeItem('user');
        const logout = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const { _id, newMessages } = user;

                const res = await fetch("http://localhost:5000/logout", {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
                body: localStorage.getItem('user'),
                body: JSON.stringify({ _id, newMessages })
                });
                localStorage.removeItem("user");
                Navigate("/Login");
            } catch (err) {
                console.error(err.message);
            }
        };
        logout();
    }, [])
    



  return (
        
    <></>
   
  
  )
}
