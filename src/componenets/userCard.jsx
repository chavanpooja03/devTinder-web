const UserCard=({user})=>{
   const {firstname,lastname,age,gender,about}=user;
 return (<div className="card bg-base-200 w-96 shadow-xl">
 <figure>
   <img
     src={user.photoUrl}
     alt="photo" />
 </figure>
 <div className="card-body">
   <h2 className="card-title">{firstname + " "+lastname}</h2>
   {age && <p>{age+","+gender}</p>}
   {about && <p>{about}</p>}
   <div className="card-actions justify-center">
     <button className="btn btn-primary">Ignore</button>
     <button className="btn btn-secondary">Accept</button>
   </div>
 </div>
</div>)
};

export default UserCard;