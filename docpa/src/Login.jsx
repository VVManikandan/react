import { useState } from "react"
import{Link} from "react-router-dom"

function Login(){
    const[pwd1,Setpwd1]=useState("");
    const[pwd2,Setpwd2]=useState("");
    const[same,Setsame]=useState(true);
    function handlechangepwd1(event){
        Setpwd1(event.target.value);
        

    }
    function handlechangepwd2(event){
        Setpwd2(event.target.value);
        if(pwd1==event.target.value){
            Setsame(true);
        }
        else{
            Setsame(false);
        }
        

    }
    return(
        <>
        <div className="row justify-content-start">
<Link className="btn btn-danger col-2" to="/">home</Link></div>
        <form style={{width:"50%",margin:"auto"}}className="mt-5">
            <div className="mb-3">
                <label  className="form-label">Email address</label>
                <input type="email" className="form-control" />
            
            </div>
            <div className="mb-3">
                <label  className="form-label" >Password</label>
                <input value={pwd1} onChange={handlechangepwd1}type="password" className="form-control" />
            </div>
            <div className="mb-3">
                <label  className="form-label" >Re-enter Password</label>
                <input value={pwd2} onChange={handlechangepwd2}type="password" className="form-control" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label" >Check me out</label>
            </div>
                {!same&&<p>password not matched</p>}
                

            <button type="submit" className="btn btn-primary">Submit</button>
            
</form>

        </>
    )
}
export default Login