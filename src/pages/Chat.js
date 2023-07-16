import React from 'react'
import Sidebar from '../components/Sidebar';
import MessageArea from '../components/MessageArea';
import { useNavigate } from 'react-router-dom';
export default function Chat() {
  const user = JSON.parse(localStorage.getItem('user'));
  const Navigate = useNavigate();
  React.useEffect(() => {
    if(!localStorage.getItem('user')){
      //console.log("keeksdebj");
      Navigate('/Login');
    }
    else {
      console.log(user);
    }
  }, [])
  
  return (
    <>
         <div className='row container-fluid justfy-content-center mt-4' style={{margin:"auto",backgroundColor:""}}>
          <div className='col-md-4'>
              <Sidebar />
          </div>
          <div className='col-md-8'>
            <MessageArea />
            </div>
         </div>
    </>
  )
}
