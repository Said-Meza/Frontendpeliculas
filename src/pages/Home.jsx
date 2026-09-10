import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { obtenerPeliculas } from "../services/peliculaService.js";

const Home = () => {

    const navigate = useNavigate();

    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const cargarPeliculas = async () => {

            try {

                const datos = await obtenerPeliculas();

                setPeliculas(datos);

            } catch (error) {

                setError(error.message);

            } finally {

                setCargando(false);

            }
        };

        cargarPeliculas();

    }, []);

    const peliculasFiltradas = peliculas.filter(
        (pelicula) =>
            pelicula.titulo
                .toLowerCase()
                .includes(busqueda.toLowerCase())
    );

    return (

        <main className="home-page">

            {/* ENCABEZADO */}

            <section className="home-header">

                <div>

                    <span className="home-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Explora películas
                    </h1>

                    <p>
                        Descubre películas y encuentra tu próxima favorita.
                    </p>

                </div>

            </section>


            {/* BUSCADOR */}

            <section className="catalogo-header">

                <div>

                    <h2>
                        Películas
                    </h2>

                    <p>
                        {peliculas.length} películas disponibles
                    </p>

                </div>

                <input
                    className="buscador"
                    type="text"
                    placeholder="🔎 Buscar película..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />

            </section>


            {/* CARGANDO */}

            {cargando && (

                <p className="mensaje">
                    Cargando películas...
                </p>

            )}


            {/* ERROR */}

            {error && (

                <p className="mensaje error">
                    {error}
                </p>

            )}


            {/* SIN RESULTADOS */}

            {!cargando &&
                !error &&
                peliculasFiltradas.length === 0 && (

                    <p className="mensaje">
                        No se encontraron películas.
                    </p>

                )}


            {/* CATÁLOGO */}

            {!cargando &&
                !error &&
                peliculasFiltradas.length > 0 && (

                    <section className="peliculas-grid">

                        {peliculasFiltradas.map(
                            (pelicula) => (

                                <article
                                    className="pelicula-card"
                                    key={pelicula.id}
                                >

                                    {/* POSTER */}

                                    <div className="poster-container">

                                        <img
                                            src={pelicula.img_url}
                                            alt={pelicula.titulo}
                                        />

                                        <span className="rating">
                                            ⭐ {pelicula.calificacion}
                                        </span>

                                    </div>


                                    {/* INFORMACIÓN */}

                                    <div className="pelicula-info">

                                        <h3>
                                            {pelicula.titulo}
                                        </h3>

                                        <p className="pelicula-meta">
                                            {pelicula.anio} ·{" "}
                                            {pelicula.genero}
                                        </p>


                                        {/* VER DETALLE */}

                                        <div className="card-actions">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/peliculas/${pelicula.id}`
                                                    )
                                                }
                                            >
                                                Ver película
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            )
                        )}

                    </section>

                )}

        </main>

    );
};

export default Home;

