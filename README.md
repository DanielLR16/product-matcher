# Prueba Técnica Full Stack Engineer - Minderest

Este repositorio contiene la prueba técnica desarrollada para el puesto de **Full Stack Engineer** en Minderest. El proyecto consiste en una aplicación web completa con frontend en **React + TailwindCSS** y backend en **PHP**, conectada a una base de datos **MySQL**.  

## Estructura del proyecto
.
├── Documentación_de_LLMM.pdf     # Documentación con preguntas realizadas a la IA
├── productos_online_init.sql     # Script para crear la base de datos e iniciar con 10 clientes
├── backend/                      # Carpeta con la API en PHP
└── frontend/                     # Carpeta con la aplicación en React + TailwindCSS


### Documentación
- **LLLMM_Documentation.pdf**: Contiene las preguntas y respuestas generadas mediante ChatGPT durante el desarrollo, utilizadas como apoyo para la implementación de base de datos, backend y frontend.

### Base de datos
- **database.sql**: Script SQL que:
  - Crea la base de datos y las tablas necesarias.
  - Define restricciones y relaciones.
  - Inserta 10 clientes de ejemplo para pruebas iniciales.

### Backend
- Carpeta: `backend/`
- Lenguaje: PHP
- Funcionalidades:
  - Conexión a la base de datos mediante PDO.
  - Endpoints para gestión de productos y clientes.
  - Manejo de consultas SQL seguras y generación de respuestas JSON.
- Archivos principales:
  - `config.php`: Configuración de la conexión a la base de datos.
  - Endpoints:
    - `add_product.php`
    - `search_products.php`
    - `add_relation.php`
    - `get_clients.php`
    - `get_client_products.php`

### Frontend
- Carpeta: `frontend/`
- Lenguajes y frameworks: React + TailwindCSS
- Funcionalidades:
  - Interfaz para visualizar y gestionar clientes y productos.
  - Formularios para añadir productos y crear relaciones con clientes.
  - Sidebar y footer adaptados al diseño.
  - Conexión con el backend mediante llamadas HTTP a los endpoints PHP.

## Requisitos para ejecutar el proyecto

- **Backend**:
  - Servidor con soporte PHP (>=7.4).
  - MySQL o MariaDB.
  - Configurar `config.php` con las credenciales de la base de datos.
  
- **Frontend**:
  - Node.js (>=16) y npm o yarn.
  - Instalar dependencias:  
    ```bash
    cd frontend
    npm install
    ```
  - Iniciar la aplicación:  
    ```bash
    npm run dev
    ```

## Uso
1. Crear la base de datos ejecutando `database.sql` en MySQL.
2. Configurar las credenciales de la base de datos en `backend/config.php`.
3. Levantar el backend en un servidor PHP.
4. Ejecutar el frontend con `npm run dev` en la carpeta `frontend`.
5. Acceder a la aplicación desde el navegador (por defecto `http://localhost:5173`).

## Notas
- La aplicación es un proyecto de prueba técnica y demuestra la integración de frontend, backend y base de datos.
- Durante el desarrollo se utilizó IA como asistente para la generación de código y diseño de la base de datos, siempre supervisado y adaptado por el desarrollador.
