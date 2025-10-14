import React, { useEffect, useState } from 'react'

export default function Home() {
    const [featured, setFeatured] = useState([])
    const idsPrincipales = [1, 2, 3, 4, 5]
    const CDN = 'https://cdn.thesimpsonsapi.com/500'

    useEffect(() => {
        fetch('https://thesimpsonsapi.com/api/characters')
            .then(res => res.json())
            .then(data => {
                const personajes = data.results || data
                // Filtramos solo a los 5 por ID
                const filtrados = personajes.filter(p => idsPrincipales.includes(p.id))
                // Ordenamos según nuestro array de IDs
                const ordenados = idsPrincipales.map(id => filtrados.find(p => p.id === id)).filter(Boolean)
                setFeatured(ordenados)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="home">
            {/* 🏡 Sección de bienvenida */}
            <div className="home-header">
                <img
                    src="/src/assets/Banner.png"
                    alt="Logo Simpsons"
                    className="home-logo"
                />
                <h1>Bienvenido al Mundo de los Simpsons</h1>
                <p>
                    Explora personajes icónicos, episodios memorables y lugares emblemáticos
                    de una de las series animadas más famosas de todos los tiempos.
                </p>
            </div>

            {/* 👨‍👩‍👧 Personajes principales */}
            {featured.length > 0 && (
                <div className="home-featured">
                    <h2>Personajes Principales</h2>
                    <div className="grid home-grid">
                        {featured.map((char) => (
                            <div className="card home-card" key={char.id}>
                                <div className="card-img-container home-img-container">
                                    <img src={`${CDN}${char.portrait_path}`} alt={char.name} />
                                </div>
                                <h3>{char.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 📅 Frase divertida */}
            <div className="home-quote">
                <p>“¡Ay caramba!” — Bart Simpson</p>
            </div>
        </div>
    )
}
