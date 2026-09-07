# Rivezli

Rivezli is a full-stack web application developed during an internship, using a modern JavaScript-based architecture. The project includes a React frontend, a Node.js/Express backend, MongoDB database integration, JWT-based authentication, and Docker containerization.

## 🚀 Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose

### DevOps

* Docker
* Docker Compose
* Git / GitHub

## 📁 Project Structure

```text
Rivezli/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── PasswordReset.js
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── auth.service.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## ✨ Features

* User registration
* User authentication and login
* JWT-based authorization
* Protected API endpoints
* User profile management
* Student/Admin role handling
* Password reset functionality
* RESTful backend API
* MongoDB database integration
* Dockerized frontend and backend

## 🔐 Authentication

Rivezli uses **JSON Web Tokens (JWT)** for authentication.

The authentication flow is:

```text
User
  │
  ▼
Register / Login
  │
  ▼
Express API
  │
  ├── Validate credentials
  ├── Hash/verify password
  └── Generate JWT
  │
  ▼
Authenticated User
  │
  ▼
Protected API Routes
```

The JWT contains information associated with the authenticated user and is verified by authentication middleware before accessing protected resources.

## 🔌 Main API Endpoints

### Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Authenticate a user            |
| GET    | `/api/auth/profile`  | Get authenticated user profile |
| PUT    | `/api/auth/profile`  | Update user profile            |

Additional authentication endpoints are implemented for password reset functionality.

> The exact API prefix may depend on the backend route configuration.

## 👥 User Roles

The application supports different user roles:

* `student`
* `admin`

Role-based middleware is used to restrict access to protected functionality.

## 🗄️ Database

The backend uses **MongoDB** with **Mongoose** for database management.

The main user data includes:

```text
User
├── nom
├── prenom
├── email
├── etablissementUniversitaire
├── numeroTelephone
├── password
└── role
```

Password reset information is handled separately through the password reset model.

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Docker (optional)

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd rivezli_project
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rivezli
JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```

## ▶️ Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on the configured port.

### Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The React development server will then be available through the URL displayed in the terminal.

## 🐳 Running with Docker

The project can also be containerized using Docker.

Build the images:

```bash
docker compose build
```

Start the containers:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Stop the containers:

```bash
docker compose down
```

## 🧪 Testing

The backend API can be tested using tools such as:

* Postman
* Insomnia
* Browser
* cURL

Example login request:

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

A successful authentication returns a JWT token that can be used to access protected endpoints.

## 🔒 Security

The project implements several basic security mechanisms:

* Password hashing using bcrypt
* JWT-based authentication
* Authentication middleware
* Role-based access control
* Protected API routes
* Environment variables for sensitive configuration

## 🛠️ Development

The project follows a separation between frontend and backend:

```text
                ┌─────────────────┐
                │   React Client  │
                └────────┬────────┘
                         │
                         │ REST API
                         ▼
                ┌─────────────────┐
                │ Node.js/Express │
                │     Backend     │
                └────────┬────────┘
                         │
                         │ Mongoose
                         ▼
                ┌─────────────────┐
                │     MongoDB     │
                └─────────────────┘
```

## 📌 Project Status

The project is currently under development as part of an internship project. The current implementation focuses on the core authentication, user management, REST API and containerization components.

## 👨‍💻 Author

**Youssef Rhouma**

Computer Engineering Student
Tunisia

GitHub: `youssefrhouma316-png`

## 📄 License

This project was developed for educational and internship purposes.
