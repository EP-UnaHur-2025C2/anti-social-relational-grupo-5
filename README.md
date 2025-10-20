[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/F3f9PyrQ)
# UnaHur - Red Anti-Social

Se solicita el modelado y desarrollo de un sistema backend para una red social llamada **“UnaHur Anti-Social Net”**, inspirada en plataformas populares que permiten a los usuarios realizar publicaciones y recibir comentarios sobre las mismas.

![Imagen](./assets/ANTI-SOCIALNET.jpeg)

# Contexto del Proyecto

En una primera reunión con los sponsors del proyecto, se definieron los siguientes requerimientos para el desarrollo de un **MVP (Producto Mínimo Viable)**:

- El sistema debe permitir que un usuario registrado realice una publicación (post), incluyendo **obligatoriamente una descripción**. De forma opcional, se podrán asociar **una o más imágenes** a dicha publicación.

- Las publicaciones pueden recibir **comentarios** por parte de otros usuarios.

- Las publicaciones pueden estar asociadas a **etiquetas (tags)**. Una misma etiqueta puede estar vinculada a múltiples publicaciones.

- Es importante que los **comentarios más antiguos que X meses** (valor configurable mediante variables de entorno, por ejemplo, 6 meses) **no se muestren** en la visualización de los posteos.

####

# Entidades y Reglas de Negocio

Los sponsors definieron los siguientes nombres y descripciones para las entidades:

- **User**: Representa a los usuarios registrados en el sistema. El campo `nickName` debe ser **único** y funcionará como identificador principal del usuario.

- **Post**: Publicación realizada por un usuario en una fecha determinada que contiene el texto que desea publicar. Puede tener **cero o más imágenes** asociadas. Debe contemplarse la posibilidad de **agregar o eliminar imágenes** posteriormente.

- **Post_Images**: Entidad que registra las imágenes asociadas a los posts. Para el MVP, solo se requiere almacenar la **URL de la imagen alojada**.

- **Comment**: Comentario que un usuario puede realizar sobre una publicación. Incluye la fecha en la que fue realizado y una indicación de si está **visible o no**, dependiendo de la configuración (X meses).

- **Tag**: Etiqueta que puede ser asignada a un post. Una etiqueta puede estar asociada a **muchos posts**, y un post puede tener **múltiples etiquetas**.

# Requerimientos Técnicos

1. **Modelado de Datos**

   - Diseñar el **Diagrama Entidad-Relación (DER)** considerando relaciones de tipo uno a muchos y muchos a muchos.

   - Además de las claves primarias, identificar en qué entidades se requiere una **clave única** (`unique key`), y definirla explícitamente.

2. **Desarrollo del Backend**

   - Crear los **endpoints CRUD** necesarios para cada entidad.

   - Implementar las rutas necesarias para gestionar las relaciones entre entidades (por ejemplo: asociar imágenes a un post, etiquetas a una publicación, etc.).

   - Desarrollar las validaciones necesarias para asegurar la integridad de los datos (schemas, validaciones de integridad referencial).

   - Desarrollar las funciones controladoras con una única responsabiliad evitando realizar comprobaciones innecesarias en esta parte del código.

3. **Configuración y Portabilidad**

   - El sistema debe poder cambiar de **base de datos** de forma transparente, utilizando configuración e instalación de dependencias adecuadas.

   - El sistema debe permitir configurar el **puerto de ejecución y variables de entorno** fácilmente.

4. **Documentación**

   - Generar la documentación de la API utilizando **Swagger (formato YAML)**, incluyendo todos los endpoints definidos.

5. **Colecciones de Prueba**

   - Entregar las colecciones necesarias para realizar pruebas (por ejemplo, colecciones de Postman o archivos JSON de ejemplo).

# Bonus

- Hace el upload de las imganes que se asocian a un POST que lo guarden en una carpeta de imagenes dentro del servidor web.
- ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
- Con la información de los post no varia muy seguido que estrategias podrian utilizar la que la información no sea constantemente consultada desde la base de datos.

# 🧠 Anti-Social Relational - Grupo 5

Este proyecto fue desarrollado como parte del trabajo práctico de Estrategias de persistencia (EDP).

---

## 👥 Trabajo realizado por

- **Alan Foa**
- **Gabriel Nonis**
- **German Bianco**
- **Lucas Cardona**
- **Nahuel Negreti Carballo**

---

## 📌 Documentación de la API

Una vez iniciado el servidor, podés acceder a todas las rutas disponibles desde:

http://localhost:3001/api-docs

Esto abrirá la interfaz de Swagger para explorar y probar los endpoints disponibles.

---

# 📝 Uso de la Colección Postman - UnaHur Anti-Social Net MVP

## ✅ Requisitos

- Servidor corriendo en `localhost:3001` (`npm run dev`)
- Borrar `data/dataBase.sqlite` para pruebas limpias
- Postman instalado (app o extensión en VS Code)

## 📥 Importar Colección

1. Abrí Postman o su extensión en VS Code
2. Importá el archivo `UnaHur_AntiSocialNet_MVP_Collection.json` desde `docs/postman`

## 🧪 Ejecución Manual (Recomendada)

Ejecutá las peticiones en orden (1 a 8):

| # | Método | Endpoint         | Resultado Esperado                     |
|---|--------|------------------|----------------------------------------|
| 1 | POST   | `/users`         | 201 Created                            |
| 2 | POST   | `/posts`         | 201 Created                            |
| 3 | POST   | `/comments`      | 201 Created                            |
| 4 | POST   | `/comments`      | 201 Created                            |
| 5 | GET    | `/comments`      | 200 OK (2 elementos)                   |
| 6 | DELETE | `/comments/2`    | 204 No Content                         |
| 7 | GET    | `/comments`      | 200 OK (1 elemento)                    |
| 8 | PUT    | `/comments/1`    | 200 OK (contenido actualizado)         |

✅ Si todos los resultados son correctos, el CRUD funciona correctamente.

## ⚙️ Ejecución Automática (Opcional)

- Clic derecho en la colección → **Run Collection**
- Postman ejecutará todo en orden y mostrará el informe
