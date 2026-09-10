
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    obtenerPeliculaPorId,
    actualizarPelicula
} from "../services/peliculaService.js";

import { useAuth } from "../context/AuthContext.jsx";

const EditarPelicula = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [formulario, setFormulario] = useState({
        titulo: "",
        descripcion: "",
        anio: "",
        genero: "",
        calificacion: "",
        img_url: ""
    });

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const cargarPelicula = async () => {

            try {

                const pelicula = await obtenerPeliculaPorId(id);

                setFormulario(pelicula);

            } catch (error) {

                alert(error.message);

            } finally {

                setCargando(false);

            }
        };

        cargarPelicula();

    }, [id]);

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarEnviar = async (e) => {

        e.preventDefault();

        try {

            await actualizarPelicula(
                id,
                formulario,
                token
            );

            alert("Película actualizada correctamente");

            navigate("/admin");

        } catch (error) {

            alert(error.message);

        }
    };

    if (cargando) {
        return (
            <main className="form-page">
                <p className="mensaje">
                    Cargando película...
                </p>
            </main>
        );
    }

    return (

        <main className="form-page">

            <section className="form-container">

                <div className="form-header">

                    <span className="form-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Editar película
                    </h1>

                    <p>
                        Modifica la información de la película.
                    </p>

                </div>


                <form
                    className="pelicula-form"
                    onSubmit={manejarEnviar}
                >

                    <div className="form-group">

                        <label htmlFor="titulo">
                            Título
                        </label>

                        <input
                            id="titulo"
                            type="text"
                            name="titulo"
                            placeholder="Ej. Interestelar"
                            value={formulario.titulo}
                            onChange={manejarCambio}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="descripcion">
                            Descripción
                        </label>

                        <textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Escribe una descripción de la película..."
                            value={formulario.descripcion}
                            onChange={manejarCambio}
                            rows="5"
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="anio">
                                Año
                            </label>

                            <input
                                id="anio"
                                type="number"
                                name="anio"
                                placeholder="2024"
                                value={formulario.anio}
                                onChange={manejarCambio}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="genero">
                                Género
                            </label>

                            <input
                                id="genero"
                                type="text"
                                name="genero"
                                placeholder="Ciencia ficción"
                                value={formulario.genero}
                                onChange={manejarCambio}
                                required
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="calificacion">
                                Calificación
                            </label>

                            <input
                                id="calificacion"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                name="calificacion"
                                placeholder="8.5"
                                value={formulario.calificacion}
                                onChange={manejarCambio}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="img_url">
                                URL de imagen
                            </label>

                            <input
                                id="img_url"
                                type="text"
                                name="img_url"
                                placeholder="https://..."
                                value={formulario.img_url}
                                onChange={manejarCambio}
                                required
                            />

                        </div>

                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Guardar cambios
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
};

export default EditarPelicula;

