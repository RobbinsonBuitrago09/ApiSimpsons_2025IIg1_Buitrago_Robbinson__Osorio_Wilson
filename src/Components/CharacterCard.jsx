import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterCard({ character }) {
  const image = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`

  return (
    <article className="card">
      <img src={image} alt={character.name} />
      <h3>{character.name}</h3>
      <p><strong>Ocupación:</strong> {character.occupation}</p>
      <p><strong>Estado:</strong> {character.status}</p>
      <Link className="btn" to={`/personaje/${character.id}`}>Ver detalles</Link>
    </article>
  )
}
