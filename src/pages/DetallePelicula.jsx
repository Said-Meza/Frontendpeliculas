
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { obtenerPeliculaPorId } from "../services/peliculaService.js";

const DetallePelicula = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pelicula, setPelicula] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const cargarPelicula = async () => {

            try {

                const datos = await obtenerPeliculaPorId(id);

                setPelicula(datos);

            } catch (error) {

                setError(error.message);

            } finally {

                setCargando(false);

            }
        };

        cargarPelicula();

    }, [id]);

    if (cargando) {
        return (
            <main className="detalle-page">
                <p className="mensaje">
                    Cargando película...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="detalle-page">
                <p className="mensaje error">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="detalle-page">

            <button
                className="detalle-regresar"
                onClick={() => navigate(-1)}
            >
                ← Regresar
            </button>

            <section className="detalle-container">

                <div className="detalle-poster">

                    <img
                        src={pelicula.img_url}
                        alt={pelicula.titulo}
                    />

                    <span className="detalle-rating">
                        ⭐ {pelicula.calificacion}
                    </span>

                </div>

                <div className="detalle-info">

                    <span className="detalle-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        {pelicula.titulo}
                    </h1>

                    <div className="detalle-meta">

                        <span>
                            📅 {pelicula.anio}
                        </span>

                        <span>
                            🎬 {pelicula.genero}
                        </span>

                        <span>
                            ⭐ {pelicula.calificacion}
                        </span>

                    </div>

                    <div className="detalle-descripcion">

                        <h2>
                            Descripción
                        </h2>

                        <p>
                            {pelicula.descripcion}
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default DetallePelicula;

