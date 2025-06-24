# AuthSystem-Postgresql

A basic authentication system using **Express.js**, **Prisma ORM**, and **PostgreSQL**. This project demonstrates user registration and login with hashed passwords, JWT authentication, and email verification (using Mailtrap for testing).

## Features

- User registration with hashed password
- User login with JWT authentication
- Email verification (Mailtrap)
- PostgreSQL database with Prisma ORM

## Project Structure

```
.
├── Controllers/
│   └── User.controller.js
├── Routes/
│   └── User.route.js
├── generated/
│   └── prisma/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .gitignore
├── index.js
├── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- [Mailtrap](https://mailtrap.io/) account for email testing

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd AuthSystem-Postgresql
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```
   PORT=3000
   DATABASE_URL="your_postgres_connection_url"
   MAILTRAP_HOST=sandbox.smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=your_mailtrap_user
   MAILTRAP_PASSWORD=your_mailtrap_password
   JWTSECURITY_WORD=your_jwt_secret
   BASE_URL=http://localhost:3000
   ```

4. **Set up the database:**

   Run Prisma migrations to create the database tables:

   ```sh
   npx prisma migrate deploy
   ```

5. **Start the server:**

   ```sh
   npm run dev
   ```

## API Endpoints

### Register

- **POST** `/api/v1/users/register`
- **Body:** `{ "name": "John", "email": "john@example.com", "password": "yourpassword" }`

### Login

- **POST** `/api/v1/users/login`
- **Body:** `{ "email": "john@example.com", "password": "yourpassword" }`

## Notes

- Emails are sent using Mailtrap for testing purposes.
- Passwords are hashed using bcryptjs.
- JWT is used for authentication and stored in HTTP-only cookies.

## License
