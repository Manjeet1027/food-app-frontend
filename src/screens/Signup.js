import React ,{ useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const baseurl = "https://food-app-backend-2-887g.onrender.com";

function Signup() {
  const [credentials, setCredentials] = useState({name:"random", email:"random@gmail.com", password:"", geolocation:""});
  const [passwordVisible, setPasswordVisible] = useState(false);

  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`${baseurl}/api/createuser`,{
    // const res = await fetch(`http://localhost:3000/api/createuser`,{
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
        body: JSON.stringify({
          name : credentials.name,
          email : credentials.email,
          password : credentials.password,
          location : credentials.geolocation
        })
      })
        const json = await res.json();
        console.log(json);
        if(!json.success){
          // alert("Enter valid credentials")
          //-
          console.log("User already exists or other validation errors:", json.error);
          alert("User already exists or other validation errors. Please check your details.");
        }
        // else{
        //-
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
        <div className="in-box">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} placeholder="Name must be atleast of 5 characters" list="name-suggestions" />
              <datalist id="name-suggestions">
                <option value="random">random</option>
                <option value="testing">testing</option>
              </datalist>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} placeholder="e.g. random@gmail.com" list="email-suggestions" />
              <datalist id="email-suggestions">
                <option value="random@gmail.com">random@gmail.com</option>
                <option value="testing@gmail.com">testing@gmail.com</option>
              </datalist>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="d-flex align-items-center">
                <input 
                type={passwordVisible ? "text" : "password"}  
                className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} placeholder="Password must be atleast of 5 characters" />
                <div className="showPass" onClick={showPass}>{passwordVisible ? open : close}</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
              <input type="text" className="form-control" id="exampleInputPassword1" name="geolocation" value={credentials.geolocation} onChange={onChange} placeholder="e.g. Delhi" list="address-suggestions"/>
              <datalist id="address-suggestions">
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
              </datalist>
            </div>


            <button type="submit" className="fs-5 m-3 p-2 btn btn-success ">Submit</button>
            <Link to="/login" className="fs-5 m-3 p-2  btn btn-danger" >Already a user</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
