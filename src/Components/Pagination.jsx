import React from 'react'

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button className="btn" onClick={onPrev} disabled={page <= 1}>
        Anterior
      </button>
      <span>Página {page} de {totalPages}</span>
      <button className="btn" onClick={onNext} disabled={page >= totalPages}>
        Siguiente
      </button>
    </div>
  )
}
