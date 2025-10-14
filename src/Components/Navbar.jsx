import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/ImageTitleTheSimpsons.png' // 👈 importa el logo

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand" onClick={closeMenu}>
        <img src={logo} alt="Simpsons Logo" className="navbar-logo" />
      </NavLink>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Menú">
        ☰
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Inicio</NavLink>
        <NavLink to="/personajes" onClick={closeMenu}>Personajes</NavLink>
        <NavLink to="/episodios" onClick={closeMenu}>Episodios</NavLink>
        <NavLink to="/lugares" onClick={closeMenu}>Ubicaciones</NavLink>
      </div>
    </nav>
  )
}
