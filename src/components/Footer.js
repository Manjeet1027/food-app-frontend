import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-end align-items-center py-3 my-4 border-top bg-success ">
    <div className="col-md-4 d-flex align-items-center text-white fs-5">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      </Link>
      <span className="footer-texttext-muted">GoFood 2024 Company ©, Inc</span>
    </div>


  </footer>
    </div>
  )
}

export default Footer
