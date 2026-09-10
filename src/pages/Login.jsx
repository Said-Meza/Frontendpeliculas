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

      iniciarSesion(datos.token, datos.usuario);

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
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={manejarSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
    </main>
  );
};

export default Login;
