const API_URL = import.meta.env.VITE_API_URL;

export const iniciarSesion = async (credenciales) => {

    const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(credenciales)
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.mensaje || "Error al iniciar sesión"
        );
    }

    return datos;
};