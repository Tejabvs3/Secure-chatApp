import {React,useContext,useEffect} from 'react'
import { AppContext } from "../context/appContext";

export default function Sidebar() {
    const user  = JSON.parse(localStorage.getItem('user'));
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
        return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
        setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    //dispatch(resetNotifications(room));
}

/*
socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
});
*/
useEffect(() => {
    if (user) {
        setCurrentRoom("general");
        getRooms();
        socket.emit("join-room", "general"); // join general room by default....dont think this is needed till now..
        socket.emit("new-user"); 
    }
}, []);

socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
});

function getRooms() {
    fetch("http://localhost:5000/rooms")
        .then((res) => res.json())
        .then((data) => setRooms(data));
}

function orderIds(id1, id2) {
    if (id1 > id2) {
        return id1 + "-" + id2;
    } else {
        return id2 + "-" + id1;
    }
}

function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
}

if (!user) {
    return <></>;
}

  return (
    <>
        <h4>Available rooms</h4>
         <ul class="list-group">
        {rooms.map((room, idx) => (
           
                    <li className={ room === currentRoom?"list-group-item list-group-item-info":"list-group-item"} key={idx} onClick={() => joinRoom(room)}  style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
                    </li>
                
                ))}
                    </ul>
                <h4>Members</h4>
                <ul class="list-group">
                 {members.map((member) => (
                   
                <li className={privateMemberMsg?._id === member?._id ? "list-group-item list-group-item-info":"list-group-item"} key={member.id} style={{ cursor: "pointer" }}  onClick={() => handlePrivateMemberMsg(member)} disabled={member._id === user._id}>
                   <div className='row '>
                        <div  className="col-2 member-status" style={{position:"relative",marginBottom:"0"}}>
                            <img src={member.picture} className="member-status-img" style={{width:"30px",height:"30px",borderRadius:"50%",objectFit:"cover"}}/>
                            {member.status === "online" ? <i className="fa fa-circle sidebar-online-status" style={{color:"#2a8e38",position:"absolute",zIndex:"99",bottom:"0",left:"12px",fontSize:"11px"}}></i> : <i className="fa fa-circle sidebar-offline-status" style={{color:"#dc3545",position:"absolute",zIndex:"99",bottom:"0",left:"12px",fontSize:"11px"}}></i>}
                        </div>
                        <div className='col-9'>
                            {member.username}
                            {member._id === user?._id && " (You)"}
                            {member.status === "offline" && " (Offline)"}
                        </div>
                        <div className='col-1'>
                            <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
                        </div>
                    </div> 
                    {/*{member.username}*/}
                </li>
                
            ))}
               </ul>
    </>
  )
}
//jsx here needs to be changed
