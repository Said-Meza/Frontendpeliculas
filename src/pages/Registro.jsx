
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registrarUsuario } from "../services/authService.js";

const Registro = () => {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setCargando(true);

        try {

            await registrarUsuario({
                nombre,
                email,
                password
            });

            alert("Usuario creado correctamente");

            navigate("/login");

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);

        }
    };

    return (
        <main className="registro-page">

            <section className="registro-container">

                <div className="registro-header">

                    <span className="registro-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Crear cuenta
                    </h1>

                    <p>
                        Regístrate para comenzar a explorar nuestro catálogo.
                    </p>

                </div>

                <form
                    className="registro-form"
                    onSubmit={manejarSubmit}
                >

                    <div className="registro-group">

                        <label htmlFor="nombre">
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="registro-group">

                        <label htmlFor="email">
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="registro-group">

                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Crea una contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (
                        <p className="registro-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="registro-button"
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Creando cuenta..."
                            : "Crear cuenta"}
                    </button>

                    <button
                        type="button"
                        className="registro-cancelar"
                        onClick={() => navigate("/login")}
                    >
                        Ya tengo una cuenta
                    </button>

                </form>

            </section>

        </main>
    );
};

export default Registro;

