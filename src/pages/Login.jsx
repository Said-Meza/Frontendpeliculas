
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { iniciarSesion as login } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const { iniciarSesion } = useAuth();

    const navigate = useNavigate();

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setCargando(true);

        try {

            const datos = await login({
                email,
                password,
            });

            iniciarSesion(
                datos.token,
                datos.usuario
            );

            if (datos.usuario.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);

        }
    };

    return (
        <main className="login-page">

            <section className="login-container">

                <div className="login-header">

                    <span className="login-subtitle">
                        CINE MATCH
                    </span>

                    <h1>
                        Bienvenido
                    </h1>

                    <p>
                        Inicia sesión para continuar explorando el catálogo.
                    </p>

                </div>

                <form
                    className="login-form"
                    onSubmit={manejarSubmit}
                >

                    <div className="login-group">

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

                    <div className="login-group">

                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="login-button"
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Iniciando..."
                            : "Iniciar sesión"}
                    </button>

                </form>

            </section>

        </main>
    );
};

export default Login;

