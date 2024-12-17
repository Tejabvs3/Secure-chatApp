import {React,useState,useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from "../context/appContext";

export default function Login() {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const { socket } = useContext(AppContext);
  const Navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT_BACKEND}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.message) {
          alert(errorData.message);
        } else {
          alert("Login failed. Please check your credentials.");
        }
        return; 
      }
      const data = await res.json();
      console.log("User logged in:", data);
      localStorage.setItem('user', JSON.stringify(data));
      // Notify server about the new user (optional)
      socket.emit("new-user");
      Navigate('/Chat');
    } catch (err) {
      console.error("Error during login:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    login();
  }


  return (
        
    <div className='container ' style={{margin:"auto",marginTop:"10vh",width:"25%",height:"65vh",backgroundColor:"rgb(241 246 252)",border:"1px solid grey",borderRadius:"5px"}}>
    <form className="mt-3" onSubmit={handleSubmit}>
    <h5 className="text-center">Sign in</h5>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control " required value={email} onChange={e=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
      {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control " required value={password} onChange={e=>setPassword(e.target.value)} id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" for="exampleCheck1">Remember</label>
    </div>
    <button type="submit" className="btn btn-primary mt-3" >Sign in</button>
  </form>
  <div className="mt-3">Dont have account? <Link to="/signup" style={{textDecorationLine:"none"}}>SignUp</Link></div>
  </div>
   
  
  )
}
