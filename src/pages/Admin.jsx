
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    obtenerPeliculas,
    eliminarPelicula
} from "../services/peliculaService.js";

import { useAuth } from "../context/AuthContext.jsx";

const Admin = () => {

    const {
        cerrarSesion,
        token,
        usuario
    } = useAuth();

    const navigate = useNavigate();

    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const manejarCerrarSesion = () => {

        cerrarSesion();

        navigate("/login");
    };

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

    const manejarEliminar = async (id) => {

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar esta película?"
        );

        if (!confirmar) {
            return;
        }

        try {

            await eliminarPelicula(id, token);

            setPeliculas(
                peliculas.filter(
                    (pelicula) => pelicula.id !== id
                )
            );

        } catch (error) {

            alert(error.message);

        }
    };

    const peliculasFiltradas = peliculas.filter(
        (pelicula) =>
            pelicula.titulo
                .toLowerCase()
                .includes(busqueda.toLowerCase())
    );

    return (

        <main className="admin-page">

            {/* ENCABEZADO */}

            <section className="admin-header">

                <div>

                    <span className="admin-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Panel de administrador
                    </h1>

                    <p>
                        Administra tu catálogo de películas
                    </p>

                </div>

                <div className="admin-actions">

                    {/* SOLO ADMIN */}

                    {usuario?.rol === "admin" && (

                        <button
                            className="btn-primary"
                            onClick={() =>
                                navigate(
                                    "/admin/peliculas/nueva"
                                )
                            }
                        >
                            + Agregar película
                        </button>

                    )}

                    <button
                        className="btn-secondary"
                        onClick={manejarCerrarSesion}
                    >
                        Cerrar sesión
                    </button>

                </div>

            </section>


            {/* ENCABEZADO DEL CATÁLOGO */}

            <section className="catalogo-header">

                <div>

                    <h2>
                        Películas
                    </h2>

                    <p>
                        {peliculas.length} películas registradas
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


            {/* PELÍCULAS */}

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


                                        {/* BOTONES */}

                                        <div className="card-actions">

                                            {/* VER - TODOS */}

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/peliculas/${pelicula.id}`
                                                    )
                                                }
                                            >
                                                Ver
                                            </button>


                                            {/* EDITAR Y ELIMINAR - SOLO ADMIN */}

                                            {usuario?.rol === "admin" && (

                                                <>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/peliculas/editar/${pelicula.id}`
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>


                                                    <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            manejarEliminar(
                                                                pelicula.id
                                                            )
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>

                                                </>

                                            )}

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

export default Admin;

