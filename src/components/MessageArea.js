import {React,useState,useContext} from 'react'
import { AppContext } from "../context/appContext";
import { useRef,useEffect } from 'react';
import { genAlgEncrypt } from "../cryptography/genAlgEncrypt.js";
import { decrypt } from "../cryptography/decrypt.js";
import './messageArea.css'

export default function MessageArea() {
    const user  = JSON.parse(localStorage.getItem('user'));
        const [message, setMessage] = useState("");
        const [decryptedMessages, setDecryptedMessages] = useState([]);
       // const user = useSelector((state) => state.user);
        const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
        const messageEndRef = useRef(null);
        useEffect(() => {
            scrollToBottom();
        }, [messages]);
    
        function getFormattedDate() {
            const date = new Date();
            const year = date.getFullYear();
            let month = (1 + date.getMonth()).toString();
    
            month = month.length > 1 ? month : "0" + month;
            let day = date.getDate().toString();
    
            day = day.length > 1 ? day : "0" + day;
    
            return month + "/" + day + "/" + year;
        }
    
        function scrollToBottom() {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    
        const todayDate = getFormattedDate();
    
        socket.off("room-messages").on("room-messages", (roomMessages) => {
            console.log(roomMessages,"room messages");
            let roomMessagesCopy = JSON.parse(JSON.stringify(roomMessages));
            
            for(let i=0;i<roomMessages.length;i++){
                for(let j=0;j<roomMessages[i].messagesByDate.length;j++){
                    roomMessagesCopy[i].messagesByDate[j].content = decrypt(roomMessages[i].messagesByDate[j].content);
                }
            }
            console.log(roomMessagesCopy,"room messages copy");
            
            console.log(roomMessages,"room messages");
            setDecryptedMessages(roomMessagesCopy);
            setMessages(roomMessages);
        });
    
        function handleSubmit(e) {
            e.preventDefault();
            if (!message) return;
            const encryptedMessage = genAlgEncrypt(message);
            const today = new Date();
            const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
            const time = today.getHours() + ":" + minutes;
            const roomId = currentRoom;
            socket.emit("message-room", roomId, encryptedMessage, user, time, todayDate);
            setMessage("");
        }
  return (
    <>
     
    <div className="messages-output" style={{height:"75vh",border:"1px solid lightgray",overflowY:"scroll",marginBottom:"20px",'&::WebkitScrollbar':{width:"thin"}}}>
                {localStorage.getItem('user') && !privateMemberMsg?._id && <div className="alert alert-warning">You are in the {currentRoom} room</div>}
                {localStorage.getItem('user') && privateMemberMsg?._id && (
                    <>
                        <div className="alert alert-warning conversation-info" style={{padding:"0",margin:"0 auto",textAlign:"center",height:"90px"}}>
                            <div>
                                Your conversation with {privateMemberMsg.username} <img src={privateMemberMsg.picture} className="conversation-profile-pic" style={{width:"60px",height:"60px",objectFit:"cover",margin:"10px auto",marginBottom:"30px",borderRadius:"50%",marginLeft:"10px"}}/>
                            </div>
                        </div>
                    </>
                )}
                {/*{!user && <div className="alert alert-danger">Please login</div>}*/}
            
                {user &&
                    decryptedMessages.map(({ _id: date, messagesByDate }, idx) => ( //change decryptedMessages to messages to check the encrypted messages in apps frontend
                        <div key={idx}>
                            <p className="alert alert-info text-center message-date-indicator" style={{width:"150px",margin:"0 auto",marginTop:"3px"}}>{date}</p>
                            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                                <div className={sender?.email === user?.email ? "message" : "incoming-message"} /*style={{display:"flex",justifyContent:"flex-end",marginRight:"20px",backgroundColor:"#ffdab9"}}*/ key={msgIdx}>
                                    <div className="message-inner" /*style={{marginLeft:"20px",marginBottom:"10px",padding:"10px",minWidth:"200px",maxWidth:"90%",textAlign:"left",minHeight:"80px",font:"400 1em, sans-serif",display:"inline-block",borderRadius:"10px",backgroundColor:"#d1e7dd",}}*/>
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} />
                                            <p className="message-sender" style={{marginBottom:"5px",fontWeight:"bold"}}>{sender._id === user?._id ? "You" : sender.username}</p>
                                        </div>
                                        <p className="message-content">{content}</p>
                                        <p className="message-timestamp-left" style={{fontSize:"0.85em",fontWeight:"300",marginTop:"10px",}}>{time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                <div ref={messageEndRef} />
            </div>
           {/* <div className='text-area' style={{height:"75vh",border:"1px solid lightgray",marginBottom:"10px"}}>
                    <form></form>
            </div>
                            */}
        
        <form onSubmit={handleSubmit}>
        <div className='row'>
            <div className='col-md-11'>
                <input type='text' className='form-control' disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type your message here' />
            </div>
            <div className='col-md-1'>
                <button className='btn btn-info'>
                    <i className='fa fa-paper-plane' disabled={!user} style={{color:"white",width:"100%"}}></i>
                </button>
            </div>    
        </div> 
        </form>
        </>
  )
}
//message-area jsx needs to be edited..