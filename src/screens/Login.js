import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const baseurl = "https://food-app-backend-2-887g.onrender.com";

function Login() {
  const [credentials, setCredentials] = useState({ email:"", password:""});
  const [passwordVisible, setPasswordVisible] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`${baseurl}/api/loginuser`,{
    // const res = await fetch(`http://localhost:3000/api/loginuser`,{
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
        body: JSON.stringify({
          email : credentials.email,
          password : credentials.password
        })
      })
        const json = await res.json();
        if(!json.success){
          console.log("incorrect")
          console.log(json);
          alert("Enter correct credentials")
        }
        else if(json.success){
          localStorage.setItem("authToken", json.authToken)
          localStorage.setItem("userEmail", credentials.email)
          console.log(localStorage.getItem("authToken"))
          navigate("/")
          }
        
  }

  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name] : event.target.value})
  }

  const close = "👁️"
  const open = "⛔"
  const showPass = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (

    <div className="user-form">
      <div className="container out-box">
        <div className="in-box ">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} placeholder="e.g. sample@gmail.com" list="email-suggestions" />
              <datalist id="email-suggestions">
                <option value="sample@gmail.com">sample@gmail.com</option>
              </datalist>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="d-flex align-items-center">
                <input 
                type={passwordVisible ? "text" : "password"} 
                className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} placeholder="e.g. 123456" />
                <div className="showPass" onClick={showPass}>{passwordVisible ? open : close}</div>
              </div>
            </div>

            <button type="submit" className="fs-5 m-3 p-2  btn btn-success">Submit</button>
            <Link to="/createuser" className="fs-5 m-3 p-2  btn btn-danger" >I'm a new user</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
