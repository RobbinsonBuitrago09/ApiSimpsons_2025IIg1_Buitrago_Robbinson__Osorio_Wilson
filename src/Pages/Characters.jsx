import React, { useEffect, useState } from 'react'
import CharacterCard from '../Components/CharacterCard'
import Loader from '../Components/Loader'
import Pagination from '../Components/Pagination'

const API_BASE = 'https://thesimpsonsapi.com/api'

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let isActive = true
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/characters?page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (!isActive) return
        setCharacters(data.results || [])
        setTotalPages(data.pages || 1)
      })
      .catch(() => setError('Error al cargar personajes'))
      .finally(() => isActive && setLoading(false))

    return () => {
      isActive = false
    }
  }, [page])

  const filtered = characters.filter(character =>
    character.name.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <Loader />
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>Personajes</h2>

      <div className="controls">
        <input
          className="search"
          placeholder="Buscar personaje por nombre"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(totalPages, p + 1))}
      />
    </div>
  )
}
