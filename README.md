# Skaters Park

Este proyecto proporciona una API para gestionar una aplicación de skaters. La aplicación permite registrar, autenticar, actualizar y eliminar skaters, al igual que manejar un panel de administración.

## Requisitos

-   Nodejs
-   npm o yarn

Para iniciar el servidor, ejecutar el siguiente comando

```sh
npm start
```

El servidor estará disponible en http://localhost:3000

También para almacenar los datos se utilizo la base de datos de PostgreSQL. La configuración de conexión esta en la carpeta database/connection.db.js

Para las vistas en la parte de frontend se utiliza handlebars y su configuración se encuentra en index.js

Para la parte de backend se utiliza el framework express.

## Estructura del proyecto

-   controllers: Contiene los controladores que manejan la lógica de negocio.
-   models: Contiene los modelos que interactúan con la base de datos.
-   public: Archivos estáticos, como imágenes.
-   utils: Utilidades y configuraciones adicionales.
-   views: Plantillas de vistas para renderizar páginas.
-   middlewares: Validan los token JWT

También se configura función para la subida de archivos al servidor. Esto gracias al paquete express-fileupload.

## Endpoints

Obtener todos los skaters

-   Endpoint: /
-   Método: GET
-   Descripción: Renderiza la página principal con la lista de todos los skaters.

Registro de skater

-   Endpoint: /registro
-   Método: GET
-   Descripción: Renderiza la página de registro.

Registrar un nuevo skater

-   Endpoint: /user
-   Método: POST
-   Descripción: Registra un nuevo skater en la base de datos entregandole un token.
-   Parámetros:
    -   id: Lo genera la base de datos de manera serial
    -   email: Correo electrónico del skater.
    -   nombre: Nombre del skater.
    -   password: Contraseña del skater encriptada con el paquete bcryptjs.
    -   repeat_password: Repetir contraseña solo para comprobación.
    -   anos_experiencia: Años de experiencia del skater.
    -   especialidad: Especialidad del skater.
    -   foto: Foto del skater.
    -   estado: Por defecto en false

Iniciar sesión

-   Endpoint: /login
-   Método: GET
-   Descripción: Renderiza la página de inicio de sesión.

Autenticar skater

-   Endpoint: /auth
-   Método: POST
-   Descripción: Autentica un skater y genera un token.
-   Parámetros:
    -   email: Correo electrónico del skater.
    -   password: Contraseña del skater encriptada con el paquete bcryptjs.

Obtener datos del skater

-   Endpoint: /datos
-   Método: GET
-   Descripción: Renderiza la página de datos del skater autenticado. Para ingresar a esta ruta debe tener un token verificado a través del middleware.

Eliminar skater

-   Endpoint: /eliminar
-   Método: DELETE
-   Descripción: Elimina el registro de un skater.
-   Parámetros:
    -   email: Correo electrónico del skater.
    -   password: Contraseña del skater encriptada con el paquete bcryptjs.
    -   repeat_password: Repetir contraseña solo para comprobación.

Actualizar skater

-   Endpoint: /actualizar
-   Método: PUT
-   Descripción: Actualiza la información de un skater.
-   Parámetros:
    -   email: Correo electrónico del skater.
    -   nombre: Nombre del skater.
    -   password: Contraseña del skater encriptada con el paquete bcryptjs.
    -   repeat_password: Repetir contraseña solo para comprobación.
    -   anos_experiencia: Años de experiencia del skater.
    -   especialidad: Especialidad del skater.

Administrador

Generar token de admin:

-   Endpoint: /admintoken
-   Método: GET
-   Descripción: Genera un token de administrador.
-   Respuesta:
    -   token: Token de administrador.

Obtener todos los skaters para cambiar sus estados:

-   Endpoint: /admin
-   Método: GET
-   Descripción: Renderiza la página de administración con la lista de todos los skaters. Para ingresar a esta ruta debe tener un token verificado a través del middleware.

Actualizar estado de skater

-   Endpoint: /estado
-   Método: PUT
-   Descripción: Actualiza el estado de un skater.
-   Parámetros:
    -   id: ID del skater.
    -   estado: Nuevo estado del skater.

## Por mejorar

Para mejorar la seguridad y funcionalidad, al proyecto le falta un formulario de registro y login para el rol de administrador. Actualmente, la vista /admintoken puede ser accedida por cualquier usuario. Para esto es necesario añadir en la tabla de la base de datos un campo de roles.

La vista /admintoken no estaba dentro de lo que se buscaba evaluar, sin embargo, lo agregue para simular un proyecto real.

---

## Conclusión

Este es un proyecto para fines educativos en donde se mezcla tanto en backend como el frontend con hbs. Cualquier contribución es bienvenida.
