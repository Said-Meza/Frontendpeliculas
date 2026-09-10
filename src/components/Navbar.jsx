import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {

    const navigate = useNavigate();
    const { token, cerrarSesion } = useAuth();

    const salir = () => {
        cerrarSesion();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/admin")}
            >
                🎬 CineMatch
            </div>

            <div className="navbar-links">

                {token && (
                    <button onClick={() => navigate("/admin")}>
                        Películas
                    </button>
                )}

                {token && (
                    <button onClick={salir}>
                        Cerrar sesión
                    </button>
                )}

            </div>

        </nav>
    );
};

export default Navbar;