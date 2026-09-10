const API_URL = import.meta.env.VITE_API_URL;

export const obtenerPeliculas = async () => {
    const respuesta = await fetch(`${API_URL}/peliculas`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener las películas");
    }

    return await respuesta.json();
};

export const obtenerPeliculaPorId = async (id) => {
    const respuesta = await fetch(`${API_URL}/peliculas/${id}`);

    if (!respuesta.ok) {
        throw new Error("Error al obtener la película");
    }

    return await respuesta.json();
};

export const crearPelicula = async (pelicula, token) => {
    const respuesta = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pelicula)
    });

    if (!respuesta.ok) {
        throw new Error("Error al crear la película");
    }

    return await respuesta.json();
};

export const actualizarPelicula = async (id, pelicula, token) => {
    const respuesta = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pelicula)
    });

    if (!respuesta.ok) {
        throw new Error("Error al actualizar la película");
    }

    return await respuesta.json();
};

export const eliminarPelicula = async (id, token) => {
    const respuesta = await fetch(`${API_URL}/peliculas/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error("Error al eliminar la película");
    }

    return await respuesta.json();
};