import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Characters from './Pages/Characters'
import CharacterDetail from './Pages/CharacterDetail'
import Episodes from './Pages/Episodes'
import Locations from './Pages/Locations'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
      
          <Route path="/" element={<Home />} />

          <Route path="/personajes" element={<Characters />} />
          <Route path="/personaje/:id" element={<CharacterDetail />} />

          <Route path="/episodios" element={<Episodes />} />

          <Route path="/lugares" element={<Locations />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>Los Simpsons - Programación Web - 2025</p>
      </footer>
    </div>
  )
}
