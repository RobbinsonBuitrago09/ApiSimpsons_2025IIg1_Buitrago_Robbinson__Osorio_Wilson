import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import Pagination from '../Components/Pagination'

const API_BASE = 'https://thesimpsonsapi.com/api'

export default function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/locations?page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return
        setLocations(data.results || [])
        setTotalPages(data.pages || 1)
      })
      .catch(() => setError('Error al cargar ubicaciones'))
      .finally(() => active && setLoading(false))

    return () => { active = false }
  }, [page])

  if (loading) return <Loader />
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2>Ubicaciones</h2>

      <div className="grid">
        {locations.map(location => (
          <article key={location.id} className="card">
            <img
              src={`https://cdn.thesimpsonsapi.com/1280${location.image_path}`}
              alt={location.name}
            />
            <h3>{location.name}</h3>
            <p><strong>Ciudad:</strong> {location.town}</p>
            <p><strong>Uso:</strong> {location.use}</p>
          </article>
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
