
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { crearPelicula } from "../services/peliculaService.js";
import { useAuth } from "../context/AuthContext.jsx";

const NuevaPelicula = () => {

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

            await crearPelicula(formulario, token);

            alert("Película creada correctamente");

            navigate("/admin");

        } catch (error) {

            alert(error.message);

        }
    };

    return (
        <main className="form-page">

            <section className="form-container">

                <div className="form-header">

                    <span className="form-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Agregar película
                    </h1>

                    <p>
                        Completa la información para agregar una nueva película al catálogo.
                    </p>

                </div>

                <form
                    className="pelicula-form"
                    onSubmit={manejarEnviar}
                >

                    <div className="form-group">

                        <label>
                            Título
                        </label>

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Ej. Interestelar"
                            value={formulario.titulo}
                            onChange={manejarCambio}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            placeholder="Escribe una breve descripción de la película..."
                            value={formulario.descripcion}
                            onChange={manejarCambio}
                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Año
                            </label>

                            <input
                                type="number"
                                name="anio"
                                placeholder="Ej. 2025"
                                value={formulario.anio}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Género
                            </label>

                            <input
                                type="text"
                                name="genero"
                                placeholder="Ej. Ciencia ficción"
                                value={formulario.genero}
                                onChange={manejarCambio}
                            />

                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Calificación
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                name="calificacion"
                                placeholder="Ej. 8.5"
                                value={formulario.calificacion}
                                onChange={manejarCambio}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                URL de imagen
                            </label>

                            <input
                                type="text"
                                name="img_url"
                                placeholder="https://..."
                                value={formulario.img_url}
                                onChange={manejarCambio}
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
                            Guardar película
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
};

export default NuevaPelicula;

