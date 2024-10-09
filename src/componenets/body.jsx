import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

import { useEffect } from "react";
const Body=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);
  const fetchUser= async() => {
    try{
      const res= await axios.get(BASE_URL+ "/profile",{
      withCredentials:true,

    });
    console.log(res.data);
    dispatch(addUser(res.data));
    console.log("User added to Redux store:", res.data);
  
   
  }catch(err){
    if(err.response && err.response.status === 401){
      navigate("/login");
      
    }
    console.log("Error occured"+err);
    
    
  }
};



  useEffect(()=>{
    if(!userData){
  fetchUser();
    }
  },[]);



   return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
   )
}
export default Body;