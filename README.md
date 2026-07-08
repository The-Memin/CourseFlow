# CourseFlow 🎓

**Gestiona tu aprendizaje, un curso a la vez.**

CourseFlow es una plataforma full-stack moderna para que estudiantes organicen, den seguimiento y visualicen su progreso en cursos y objetivos de aprendizaje. Combina un backend robusto en Spring Boot 4 con un frontend dinámico en React 19.

![Java 17](https://img.shields.io/badge/Java-17-%23ED8B00?logo=openjdk)
![Spring Boot 4](https://img.shields.io/badge/Spring_Boot-4.0.6-%236DB33F?logo=springboot)
![React 19](https://img.shields.io/badge/React-19-%2361DAFB?logo=react)
![TypeScript 6](https://img.shields.io/badge/TypeScript-6-%233178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-%234169E1?logo=postgresql)
![License MIT](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Funcionalidades

- **Autenticación segura** — Registro e inicio de sesión con JWT, roles `USER` y `ADMIN`
- **Gestión de cursos** — CRUD completo con estados: No iniciado, En progreso, Completado, En pausa
- **Objetivos y metas** — Define objetivos por curso con unidad (temas, horas, ejercicios, laboratorios, proyectos), prioridad y seguimiento de progreso
- **Dashboard interactivo** — Estadísticas visuales con gráficos (Recharts), vista general del progreso
- **Panel de administración** — Gestión de usuarios y cursos (en desarrollo)
- **Tema claro/oscuro** — Alterna entre modos con `next-themes`
- **UI moderna** — Componentes con shadcn/ui, Tailwind CSS 4 y animaciones con Framer Motion

---

## 🛠 Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Backend** | Java 17, Spring Boot 4.0.6, Spring Security, Spring Data JPA, Spring Validation |
| **Frontend** | React 19, TypeScript 6, Vite 8, Tailwind CSS 4, shadcn/ui, Radix UI |
| **Base de datos** | PostgreSQL 16 |
| **Autenticación** | JWT (jjwt 0.12.7), BCrypt |
| **HTTP Client** | Axios, TanStack React Query |
| **Formularios** | React Hook Form + Zod |
| **Build** | Maven (backend), pnpm (frontend) |
| **Testing** | Spring Boot Test, JUnit |

---

## 📋 Requisitos Previos

- **Java 17** o superior
- **Maven** (incluye wrapper `./mvnw`)
- **Node.js** 20+ y **pnpm**
- **Docker** (opcional, para la base de datos)
- **PostgreSQL 16** (si no usas Docker)

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/guillermojm/courseflow.git
cd courseflow
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y ajústalo si es necesario:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DB_URL` | URL de conexión a PostgreSQL | `jdbc:postgresql://localhost:5432/alumnos_db` |
| `DB_USERNAME` | Usuario de BD | `admin` |
| `DB_PASSWORD` | Contraseña de BD | `admin123*` |
| `JWT_SECRET` | Clave secreta para firmar JWT | *(cambiar en producción)* |
| `JWT_EXPIRATION` | Duración del token en ms | `86400000` |
| `VITE_API_URL` | URL base de la API (frontend) | `http://localhost:8080/api` |

### 3. Levantar la base de datos

**Opción A — Con Docker (recomendado):**

```bash
docker compose up -d
```

**Opción B — Con PostgreSQL local:**

Asegúrate de tener PostgreSQL corriendo y crea la base de datos:

```bash
createdb alumnos_db
```

### 4. Iniciar el backend

```bash
cd backend
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`.

### 5. Iniciar el frontend

```bash
cd frontend
pnpm install
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 6. Acceder

1. Abre `http://localhost:5173` en tu navegador
2. Regístrate como nuevo usuario
3. ¡Comienza a gestionar tus cursos!

---

## 📡 API REST

### Autenticación (pública)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión (devuelve JWT) |

### Estudiantes (requiere autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/students` | Lista paginada de estudiantes |
| `GET` | `/api/students/{uuid}` | Estudiante por UUID |
| `POST` | `/api/students` | Crear estudiante |
| `PUT` | `/api/students/{uuid}` | Actualizar estudiante |
| `DELETE` | `/api/students/{uuid}` | Eliminar estudiante |

### Cursos (requiere autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/courses` | Cursos del estudiante autenticado |
| `GET` | `/api/courses/{uuid}` | Curso por UUID |
| `POST` | `/api/courses` | Crear curso |
| `PUT` | `/api/courses/{uuid}` | Actualizar curso |
| `DELETE` | `/api/courses/{uuid}` | Eliminar curso |

### Objetivos (requiere autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/goals` | Objetivos del estudiante |
| `GET` | `/api/goals/{uuid}` | Objetivo por UUID |
| `POST` | `/api/goals` | Crear objetivo |
| `PUT` | `/api/goals/{uuid}` | Actualizar objetivo |
| `DELETE` | `/api/goals/{uuid}` | Eliminar objetivo |

### Administración (requiere rol ADMIN)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/admin/ping` | Health check |

---

## 📁 Estructura del Proyecto

```
courseflow/
├── backend/                      # API REST (Spring Boot)
│   └── src/main/java/dev/guillermojm/student_management/
│       ├── auth/                 # Autenticación JWT
│       ├── config/               # Configuración (Security, CORS)
│       ├── controller/           # Controladores REST
│       ├── dto/                  # Objetos de transferencia
│       ├── entity/               # Entidades JPA
│       ├── enums/                # Enumeraciones (Role, Status, etc.)
│       ├── exception/            # Manejo global de errores
│       ├── mapper/               # MapStruct mappers
│       ├── repository/           # Repositorios JPA
│       └── service/              # Lógica de negocio
├── frontend/                     # SPA (React + Vite)
│   └── src/
│       ├── components/           # Componentes React
│       ├── config/               # Configuración del frontend
│       ├── context/              # Contextos (AuthContext)
│       ├── dto/                  # Tipos e interfaces DTO
│       ├── hooks/                # Custom hooks
│       ├── layouts/              # Layouts (Dashboard, Público)
│       ├── lib/                  # Utilidades (api-client, auth-storage)
│       ├── pages/                # Páginas de la aplicación
│       ├── providers/            # Providers (Auth, Theme)
│       ├── routes/               # Configuración de rutas
│       ├── schemas/              # Esquemas de validación (Zod)
│       └── services/             # Servicios API
├── docker-compose.yml            # Base de datos PostgreSQL
├── application.yml               # Override de propiedades
└── .env.example                  # Variables de entorno
```

---

## 🧪 Tests

```bash
# Backend
cd backend
./mvnw test

# Frontend
cd frontend
pnpm test
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver [LICENSE](LICENSE) para más información.
