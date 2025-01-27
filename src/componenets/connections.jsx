import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections=()=>{
    const connections=useSelector((store)=>store.connection);
    const dispatch=useDispatch();
    const fetchConnections=async()=>{
        try{
         const res=await axios.get(BASE_URL+"/user/connection",{withCredentials:true});
         console.log(res.data);
         dispatch(addConnections(res.data.data));
        }catch(err){
          return res.json({message:"Something went wrong"});
        }
     
    }
    useEffect(()=>{
        fetchConnections();
    })
   if(!connections){
    return;
   }
   if(connections.length===0){
    return <h1>No Connection Found</h1>
   }
    return <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {
            connections.map((connection)=>{
               const {photoUrl,firstname,lastname,age,gender,about}=connection;
             return (
               <div className ="flex m-4 p-4 border rounded-lg bg-base-300 w=1/2 mx-auto">
                  <div>
                  <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                  </div>
                  <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">{firstname+" "+lastname}</h2>
                  {age && gender &&(<p>{age+ ","+ gender}</p>)}
                  <p>{about}</p>
                  </div>
                 
                

               </div>
             );
                
               
             })
        }
    </div>
};
export default Connections;