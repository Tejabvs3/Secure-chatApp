import {React,useRef,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Signup() {
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');
  const [image,setImage]=useState("https://img.icons8.com/ios/50/000000/chat.png");
  const [imagePreview,setImagePreview]=useState("");
  const [uploadingImage,setUploadingImage]=useState(false);
  const Navigate = useNavigate();
  const signup=async()=>{
    const res=await fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,email,password,picture:image
      }),
    })
    const data=await res.json();
    console.log(data);
    Navigate('/login');
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if(selectedFile.size>=1048576) {
      return alert('File size should be less than 1MB');

    }
    if (!selectedFile.type.includes('png') && !selectedFile.type.includes('jpeg')) {
      return alert('File type should be PNG or JPEG');
    }
    else{
    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    console.log(URL.createObjectURL(selectedFile));
    console.log(selectedFile.name);
    }
  };
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
      fileInputRef.current.click();
    };

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'dmpmjeay');
      try {  
        setUploadingImage(true);
        const response = await fetch("https://api.cloudinary.com/v1_1/dklcboou4/image/upload", {
          method: 'POST',
          body: formData,
        });
        setUploadingImage(false);
        const data = await response.json();
        return data.url;
        
      } catch (error) {
        setUploadingImage(false);
        console.log(error);
        alert('Error uploading image');
      }
    
     
    };


   async function handleSubmit(e){
      e.preventDefault();
      if(!image){
        return alert("Please upload your profile picture");
      }
      const url = await uploadImage(image);
      console.log(url);
      signup();
      
    }

  return (
    <>
    <h4 className='text-center'style={{marginTop:"1vh",marginBottom:"3vh"}}>Create New Account</h4>
    <div className='container ' style={{margin:"auto",width:"25%",height:"80vh",backgroundColor:"rgb(241 246 252)",border:"1px solid grey",borderRadius:"5px"}}>
   <div className="row justify-content-center mt-2" > 
    <div className="col-4">
    <img src={imagePreview||image} alt="chat" style={{width:"60px",height:"60px",borderRadius:"50%",border:"1px solid #4b74e5",objectFit:"cover",}}/>
    <label htmlFor="image-uploaded" className="image-upload-label">
        <i className="fa fa-plus-circle app-picture-icon" onClick={handleImageClick} style={{position:"relative",top:"28px",borderRadius:"50%",right:"10px",color:"#4b74e5",backgroundColor:"white",cursor:"pointer",zIndex:"99"}}></i>
    </label>
    <input type="file" id="image-upload" hidden accept="image/png image/jpeg"    ref={fileInputRef} onChange={handleFileChange}/>
    </div>
    </div>
       
    <form className="mt-3" type="submit" onSubmit={handleSubmit}>
       
    <div className="mb-2">
      <label for="exampleInputUsername" required className="form-label">Username</label>
      <input type="text" className="form-control " value={username} onChange={e=>setUsername(e.target.value)} id="exampleInputUsername"/>
    </div>
    <div className="mb-2">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control " required value={email} onChange={e=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
      {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
    </div>
    <div className="mb-2">
      <label for="exampleInputPassword1" className="form-label">Create Password</label>
      <input type="password" className="form-control " required value={password} onChange={e=>setPassword(e.target.value)} id="exampleInputPassword1"/>
    </div>
    <div className="mb-2 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" for="exampleCheck1">Remember</label>
    </div>
    <button type="submit" className="btn btn-primary mt-3" >{uploadingImage?"Signing you up...":"Signup"}</button>
  </form>
 <div className="mt-3">Already have account? <Link to="/login" style={{textDecorationLine:"none"}}>Login</Link> </div>
  </div>
  </>
  )
}

