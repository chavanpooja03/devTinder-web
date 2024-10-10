import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import  Feed from "./feed";
import {BASE_URL} from "../utils/constants";
import UserCard from "./userCard";
const EditProfile=({user})=>{

 



    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [firstname,setfirstname]=useState(user.firstname);
    const [lastname,setlastname]=useState(user.lastname);
    const [age,setAge]=useState(user.age);
    const [gender,setGender]=useState(user.gender);
    const [about,setAbout]=useState(user.about);
    const [photoUrl,setphotoUrl]=useState(user.photoUrl);
    const [error,setError]=useState("");
    const [showToast,setshowToast]=useState(false);
    const saveProfile=async()=>{
      setError("");
      try{
        const res=await axios.patch(BASE_URL+"/profile/edit",{
          photoUrl,
          firstname,
          lastname,
         
          age,
          gender,
          about
           },{withCredentials:true});
           dispatch(addUser(res?.data?.data));
           setshowToast(true);
           setTimeout(()=>{
            setshowToast(false);
           },3000);
      }catch(err){
             setError(err.response?.data?.error);
      }
     

   }
    return (
<>
        <div className="flex justify-center my-10 mx-10">
    <div className="flex justify-center my-10"> 
        <div className="card bg-base-200 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">Photo Update</span>
       </div>
      <input 
      type="text" 
      value={photoUrl}
      onChange={(e)=>setphotoUrl(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">First Name</span>
       </div>
      <input 
      type="text" 
      value={firstname}
      onChange={(e)=>setfirstname(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
    
    <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">Last Name</span>
       </div>
      <input 
      type="text" 
      value={lastname}
      onChange={(e)=>setlastname(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
    <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">Age</span>
       </div>
      <input 
      type="number" 
      value={age}
      onChange={(e)=>setAge(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
    <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">Gender</span>
       </div>
      <input 
      type="text" 
      value={gender}
      onChange={(e)=>setGender(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
    <label className="form-control w-full max-w-xs my-2">
        <div className="label">
         <span className="label-text">About</span>
       </div>
      <input 
      type="text" 
      value={about}
      onChange={(e)=>setAbout(e.target.value)}
      className="input input-bordered w-full max-w-xs" 
      />
     
    </label>
    </div>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={saveProfile}>Edit profile</button>
        </div>
      </div>
    </div></div>
    <UserCard user={{photoUrl,firstname,lastname,age,gender,about}}/>
    </div>
   {showToast &&( <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Edited successfully.</span>
  </div>
</div>)}
    
</>);
}
export default EditProfile