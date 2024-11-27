import {React,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom';

function Navigation() {

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  
 let location = useLocation(); // dont remove this line helpful for rerendering

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">SecureChat</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className="nav-link" to="/Chat">Chat</Link>
        </li>
        {!localStorage.getItem('user')?<li className="nav-item">
        <Link className="nav-link" to="/Login" >Login</Link>
        </li>:""}
        {localStorage.getItem('user')?<li className="nav-item">
        <Link className="nav-link" to="/Logout" >Logout</Link>
        </li>:""}
        {!localStorage.getItem('user')?<li className="nav-item">
        <Link className="nav-link" to="/Signup">Signup</Link>
        </li>:""}
     
      </ul>
    </div>
  </div>
</nav>

  );
}


export default Navigation;
