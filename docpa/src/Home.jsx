import { useState,useEffect} from "react"
import {Link,useNavigate } from "react-router-dom"
import Doctordetails from "./Doctordetails";
import Details from "./Details";
import './DiabetesChatbot.css';
import DiabetesChatbot from "./DiabetesChatbot"




function Home(){
  const navigate=useNavigate();
    const [posts,Setposts]=useState(null)
    const[error,SetError]=useState(null)
  useEffect(()=>{
    setTimeout(()=>{
    fetch('http://localhost:3000/posts')
     
    .then(response=>{
      if(!response.ok){
        throw Error("could not retrive data");
      }
        return response.json()
    }).then(data=>Setposts(data)).catch((error)=>{
      console.log(error.message)
      SetError(error.message);
    })},1000)
  },[]);
  if(!posts){
    return(
        <>
        { !error&& <img src="data\assets\react.svg"></img>}
        {error &&<p>{error}</p>}
        </>
    )
  }
 
    return(
        <>
        <section className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <h1>DOCPA</h1>
            <div className="row justify-content-end">
            <Link className='btn btn-primary m-5 col-4'to="/Login" > login</Link></div>
          </div>

        </section>
        {posts && posts.map(post=>{
          return(
            <div key={post.id} className="card m-3" style={{width:'18rem',display:'inline-block'}} onClick={()=>{navigate('/Doctordetails/'+post.id)}}>
              <div className="card-body">
              <h5 className="card-header">{post.letter}</h5>
              <h6 className="card-title">{post.Doctorname}</h6>
              <h6 className="card-text">{post.Hospital}</h6>
              </div>


            </div>
            
          )
        })}
        <Details/>
        <DiabetesChatbot/>
         
        
       
        
                    </>
    )
}

export default Home
//npx json-server --watch data/Dummydata.json --port 3000 --static ./data