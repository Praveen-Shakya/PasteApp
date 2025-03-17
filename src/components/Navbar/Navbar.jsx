import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='main'>
      <NavLink to="/" className="links">
         Home
      </NavLink>
      <NavLink to="/pastes" className="links">
         Paste
      </NavLink>
    </div>
  )
}

export default Navbar
