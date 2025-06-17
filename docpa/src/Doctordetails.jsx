import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";


function Doctordetails(){
    
    const [Post, SetPost]=useState(null);
    const {id}=useParams();
     useEffect(()=>{
    fetch('http://localhost:3000/posts/'+id)
     
    .then(response=>{

        return response.json()
    }).then(data=>SetPost(data)).catch((error)=>{
      console.log(error.message)
      
    })},[])

    return(
        <>
        <div>
            {Post &&<div className="card m-5" style={{width:'50%'}}>
                
                <h1 className="card-header">{Post.letter}</h1>
                <p className="card-text" style={{display:'inline-block'}}>{Post.title}</p>
                
            </div>}
            <Link to="/" className="btn btn-danger m-5" style={{width:'20%'}}>BACK</Link>
        </div>
        </>
    )
}
export default Doctordetails