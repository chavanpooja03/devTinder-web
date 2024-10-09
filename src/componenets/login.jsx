import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import  Feed from "./feed";
import {BASE_URL} from "../utils/constants";

const Login=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email,setEmailId]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const handleLogin = async () => {
    
    try {

      const res = await axios.post(BASE_URL+"/login", {
        email,
        password,
      },{withCredentials:true});
      console.log("Login successful", res.data);
      dispatch(addUser(res.data));
      return navigate("/");
      // Clear error on success
      // Handle further actions like saving tokens or redirecting the user
    } catch (err) {
      
      if (err.response) {
        setError("Response error:"+ err.response.data);
        setError.log("Status code:"+ err.response.status);  // Check if it's returning a 402 here
      } else {
        setError.log("Request error:"+ err.request);
      }
        
      }
    };
  


  return (<div className="flex justify-center my-10"> 
    <div className="card bg-base-200 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
<div>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
     <span className="label-text">Enter your email</span>
   </div>
  <input 
  type="text" 
  value={email}
  onChange={(e)=>setEmailId(e.target.value)}
  className="input input-bordered w-full max-w-xs" 
  />
 
</label>
<label className="form-control w-full max-w-xs my-2">
    <div className="label">
     <span className="label-text">Enter your Password</span>
   </div>
  <input 
  type="text" 
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  className="input input-bordered w-full max-w-xs" 
  />
 
</label>
</div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>login</button>
    </div>
  </div>
</div></div>)
}
export default Login;