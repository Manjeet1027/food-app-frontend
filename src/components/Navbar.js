import React, { useState } from "react"
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";

function Navbar() {
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  let data  = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-4 mx-3" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My orders</Link>
                  </li>
                : ""
              }
            </ul>
              {
                (!localStorage.getItem("authToken")) ?
                  <div className="d-flex">
                    <Link className="btn1 fs-5 btn mx-1" to="/login">Login</Link>
                    <Link className="btn1 fs-5 btn mx-1" to="/createuser">Sign up</Link>
                  </div>
                :
                <div>
                  <div className="btn1 fs-5 btn mx-2" onClick={() => {setCartView(true)}}>
                    My Cart {""}
                    <Badge className="badge" pill bg="danger" >{data.length}</Badge>
                  </div>
                  {
                    cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null
                  }
                  <div className="btn1 fs-5 btn bg-danger text-white mx-2" onClick={handleLogout} >
                    Log Out
                  </div>
                </div>
              }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
