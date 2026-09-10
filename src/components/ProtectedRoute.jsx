
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {

    const {
        autenticado,
        usuario
    } = useAuth();

    // No ha iniciado sesión
    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    // Está logueado, pero no es administrador
    if (usuario?.rol !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Es administrador
    return children;
};

export default ProtectedRoute;

