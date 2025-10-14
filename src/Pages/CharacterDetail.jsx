import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../Components/Loader'

const API_BASE = 'https://thesimpsonsapi.com/api'

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/characters/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return
        setCharacter(data)
      })
      .catch(() => setError('Error al cargar el personaje'))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [id])

  if (loading) return <Loader />
  if (error) return <div className="container">{error}</div>
  if (!character) return <div className="container">No se encontró el personaje</div>

  const image = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`

  return (
    <div className="container character-detail-container">
      <h2>{character.name}</h2>
      <div style={{ display: 'flex', gap: 100, flexWrap: 'wrap' }}>
        <img
          src={image}
          alt={character.name}
          style={{ maxWidth: 400, borderRadius: 8 }}
        />
        <div>
          <p><strong>Edad:</strong> {character.age || 'Desconocida'}</p>
          <p><strong>Ocupación:</strong> {character.occupation || 'Desconocida'}</p>
          <p><strong>Estado:</strong> {character.status || 'Desconocido'}</p>
          <p><strong>Fecha de nacimiento:</strong> {character.birthdate || 'No disponible'}</p>
          <p><strong>Género:</strong> {character.gender || 'No especificado'}</p>

          {character.phrases && character.phrases.length > 0 && (
            <div>
              <p><strong>Frases célebres:</strong></p>
              <ul>
                {character.phrases.map((phrase, index) => (
                  <li key={index}>{phrase}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/personajes">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  )

}
