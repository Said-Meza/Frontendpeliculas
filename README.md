# 🎬 CineMatch

Aplicación web para explorar, consultar y administrar un catálogo de películas y series.

CineMatch fue desarrollado como un proyecto full-stack utilizando **React** para el frontend, **Node.js y Express** para el backend y **PostgreSQL** como sistema de base de datos. La aplicación cuenta con autenticación mediante JWT y diferentes permisos dependiendo del tipo de usuario.

---

## 📌 Descripción del proyecto

CineMatch permite a los usuarios consultar un catálogo de películas, realizar búsquedas y visualizar la información detallada de cada película.

Además, cuenta con un panel de administración desde el cual un usuario con rol de administrador puede:

* Agregar películas.
* Editar películas.
* Eliminar películas.
* Consultar todas las películas registradas.
* Buscar películas dentro del catálogo.

El proyecto está dividido en **frontend** y **backend**, comunicándose mediante una API REST.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React
* Vite
* React Router
* Context API
* JavaScript
* CSS

### Backend

* Node.js
* Express
* API REST
* JWT
* bcrypt
* CORS
* dotenv

### Base de datos

* PostgreSQL
* Supabase

---

## 🗂️ Estructura del proyecto

```text
CineMatch/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── peliculasController.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── usuariosModel.js
│   │   │   └── peliculasModel.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── usuarioRoutes.js
│   │   │   └── peliculaRoutes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🎥 Funcionalidades

### 👤 Usuarios

Los usuarios pueden:

* Registrarse.
* Iniciar sesión.
* Consultar películas.
* Buscar películas.
* Ver el detalle de una película.
* Cerrar sesión.

### 🔐 Administradores

Los administradores cuentan con permisos adicionales para:

* Acceder al panel de administración.
* Registrar nuevas películas.
* Editar películas existentes.
* Eliminar películas.
* Consultar y buscar películas.

---

## 🔑 Autenticación

El sistema utiliza **JSON Web Token (JWT)** para manejar las sesiones.

Cuando un usuario inicia sesión correctamente, el backend genera un token que contiene información como:

* ID del usuario.
* Correo electrónico.
* Rol del usuario.

El token se utiliza para proteger las operaciones que requieren permisos de administrador.

Las contraseñas no se almacenan directamente. Antes de guardarse en la base de datos son procesadas mediante **bcrypt**.

---

## 🗄️ Base de datos

El proyecto utiliza **PostgreSQL** mediante Supabase.

La aplicación utiliza dos tablas principales:

### Tabla `usuarios`

Contiene la información necesaria para gestionar las cuentas de usuario.

Campos principales:

```text
id
nombre
email
password
rol
```

### Tabla `peliculas`

Contiene la información del catálogo.

Campos principales:

```text
id
titulo
descripcion
anio
genero
calificacion
img_url
```

---

## 🔌 API REST

El frontend se comunica con el backend mediante peticiones HTTP.

### Autenticación

```text
POST /api/auth/login
POST /api/auth/registro
```

### Películas

```text
GET    /api/peliculas
GET    /api/peliculas/:id
POST   /api/peliculas
PUT    /api/peliculas/:id
DELETE /api/peliculas/:id
```

Las operaciones de creación, modificación y eliminación requieren autenticación y permisos correspondientes.

---

## ⚙️ Variables de entorno

Por seguridad, las credenciales y configuraciones importantes no se incluyen directamente en el código.

### Backend

Ejemplo de las variables utilizadas:

```env
PORT=3000

DATABASE_URL=tu_conexion_de_postgresql

JWT_SECRET=tu_clave_secreta
```

### Frontend

El frontend utiliza una variable de entorno para indicar la dirección de la API:

```env
VITE_API_URL=http://localhost:3000/api
```

Al desplegar el proyecto, esta dirección deberá cambiarse por la URL pública del backend.

---

## 💻 Instalación y ejecución

### 1. Clonar el proyecto

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend` y agregar las variables correspondientes.

### 4. Ejecutar el backend

```bash
npm run dev
```

o, dependiendo de la configuración:

```bash
npm start
```

---

### 5. Instalar dependencias del frontend

Desde la carpeta del frontend:

```bash
npm install
```

### 6. Configurar el frontend

Crear el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 7. Ejecutar el frontend

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para acceder a la aplicación.

---

## 🔒 Seguridad

El proyecto implementa algunas medidas básicas de seguridad:

* Contraseñas protegidas mediante bcrypt.
* Autenticación mediante JWT.
* Rutas protegidas para administradores.
* Variables sensibles almacenadas mediante variables de entorno.
* Validación básica de datos en el backend.
* CORS configurado para permitir la comunicación entre frontend y backend.

---

## 🎯 Objetivo académico

El objetivo del proyecto fue desarrollar una aplicación web full-stack que integrara:

* Desarrollo frontend.
* Desarrollo backend.
* Creación y consumo de una API REST.
* Manejo de bases de datos.
* Autenticación de usuarios.
* Control de roles y permisos.
* Comunicación entre frontend y backend.
* Diseño de una interfaz web funcional.

El proyecto permitió aplicar conocimientos de **JavaScript, React, Node.js, Express, PostgreSQL y desarrollo de APIs REST**.

---

## 👨‍💻 Autor

**Said Meza Delgado**

Proyecto académico — **CineMatch**

---

## 📄 Licencia

Proyecto desarrollado con fines académicos y educativos.
