import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import Pagination from '../Components/Pagination'

const API_BASE = 'https://thesimpsonsapi.com/api'

export default function Episodes() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [seasonFilter, setSeasonFilter] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/episodes?page=${page}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return
        setEpisodes(data.results || [])
        setTotalPages(data.pages || 1)
      })
      .catch(() => setError('Error al cargar episodios'))
      .finally(() => active && setLoading(false))

    return () => { active = false }
  }, [page])

  if (loading) return <Loader />
  if (error) return <div>{error}</div>

  const filtered = seasonFilter
    ? episodes.filter(ep => String(ep.season) === String(seasonFilter))
    : episodes
    
  const seasons = [...new Set(episodes.map(ep => ep.season))].sort((a, b) => a - b)

  return (
    <div>
      <h2>Episodios</h2>

      <div className="controls">
        <select
          className="search"
          value={seasonFilter}
          onChange={e => setSeasonFilter(e.target.value)}
        >
          <option value="">Todas las temporadas</option>
          {seasons.map(season => (
            <option key={season} value={season}>Temporada {season}</option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filtered.map(episode => (
          <article key={episode.id} className="card">
            <img
              src={`https://cdn.thesimpsonsapi.com/200${episode.image_path}`}
              alt={episode.name}
            />
            <h3>{episode.name}</h3>
            <p><strong>Temporada:</strong> {episode.season}</p>
            <p><strong>Episodio:</strong> {episode.episode_number}</p>
            <p><strong>Fecha:</strong> {episode.airdate}</p>
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
