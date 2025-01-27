import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { addRequest,removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";


const Requests=()=>{
   const request=useSelector((store)=>store.request);
   const dispatch=useDispatch();
   
   const reviewRequest=async(status,_id)=>{
       try{
        const res=axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
          withCredentials:true,
          
        })
        dispatch(removeRequest(_id));
       }catch(err){

       }
   }
    const fetchRequest=async()=>{
        try{
          const res=await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
          console.log(res.data);
          if (res.data &&  Array.isArray(res.data.connectionRequest)) {
            dispatch(addRequest(res.data.connectionRequest)); // Dispatch the requests
        } else {
            console.error("Unexpected data structure:", res.data);
        }
          
        }catch(err){
         console.error("Something went wrong");
        }

    }
    useEffect(()=>{
      fetchRequest();
    },[])
    if(!request){
      return;
    }
    if(request.length===0){
      return <h1>"No request found"</h1>
    }
    return <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections Request</h1>
        {
            request.map((request)=>{
               const {_id,photoUrl,firstname,lastname,age,gender,about}=request.fromUserId;
             return (
               <
                div  key={_id} className ="flex justify-between item-center m-4 p-4 border rounded-lg bg-base-300 w=1/2 mx-auto">
                  <div>
                  <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
                  </div>
                  <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">{firstname+" "+lastname}</h2>
                  {age && gender &&(<p>{age+ ","+ gender}</p>)}
                  <p>{about}</p>
                  </div>
                 <div>
                  <button className="btn btn-primary mx-2 " onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                  <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                 </div>
                

               </div>
             );
                
               
             })
        }
    </div>
};
export default Requests;