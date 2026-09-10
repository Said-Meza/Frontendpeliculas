import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import NuevaPelicula from "./pages/NuevaPelicula.jsx";
import EditarPelicula from "./pages/EditarPelicula.jsx";
import DetallePelicula from "./pages/DetallePelicula.jsx";
import Registro from "./pages/Registro.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                {/* RUTAS PÚBLICAS */}

                <Route
                    path="/"
                    element={<Home />}
                />
                
                <Route path="/registro" element={<Registro />} />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/peliculas/:id"
                    element={<DetallePelicula />}
                />


                {/* RUTAS EXCLUSIVAS DEL ADMIN */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/peliculas/nueva"
                    element={
                        <ProtectedRoute>
                            <NuevaPelicula />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/peliculas/editar/:id"
                    element={
                        <ProtectedRoute>
                            <EditarPelicula />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default App;