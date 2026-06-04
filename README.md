# The Wild Oasis API

A scalable and maintainable REST API powering **The Wild Oasis**, a hotel management platform designed to handle cabin management, bookings, guests, and operational workflows.

This project focuses on real-world backend development practices, including clean architecture, database abstraction, centralized error handling, middleware-driven request processing, and scalable API design.

---

## Overview

The Wild Oasis API serves as the backend layer of the application, managing business logic, database operations, filtering, sorting, and future authentication workflows.

The architecture is designed to keep concerns separated, making the codebase easier to maintain, extend, and test as the project grows.

---

## Features

### Current Features

- RESTful API Architecture
- Layered Architecture (Routes → Controllers → Services)
- PostgreSQL Database Integration
- Prisma ORM
- Centralized Error Handling
- Custom Error Classes
- Middleware-Based Request Processing
- Dynamic Filtering
- Dynamic Sorting
- Environment-Based Configuration
- Database Seeding
- Modular Folder Structure
- Clean Separation of Concerns

### Planned Features

- JWT Authentication
- Authorization & Role Management
- Pagination
- Request Validation
- API Security Enhancements
- Rate Limiting
- API Documentation
- Automated Testing

---

## Architecture

```text
src
├── routes
│   └── API endpoint definitions
│
├── controllers
│   └── Request and response handling
│
├── services
│   └── Business logic
│
│
├── prisma
│   ├── schema.prisma
│   └── seed.ts
│
└── server.js
```

### Architecture Philosophy

The application follows a layered architecture pattern:

- Routes define API endpoints.
- Controllers manage HTTP communication.
- Services contain business logic.
- Prisma handles database access.

This separation keeps the codebase scalable and maintainable while reducing coupling between layers.

---

## Technical Highlights

### Clean Architecture

Business logic is isolated from routing and HTTP concerns, making the application easier to maintain and extend.

### Centralized Error Handling

A dedicated error handling layer provides consistent API responses and simplifies debugging across the application.

### Flexible Query System

Filtering and sorting mechanisms allow clients to retrieve data efficiently without creating multiple specialized endpoints.

### Database Abstraction

Prisma ORM provides type-safe database operations, cleaner queries, and improved developer productivity.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Development Tools

- Nodemon
- TSX
- dotenv

---

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- PostgreSQL
- npm

---

### Clone Repository

```bash
git clone https://github.com/Soroush47/the-wild-oasis-server.git

cd the-wild-oasis-server
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

PORT=3000
```

---

## Database Setup

### Push Prisma Schema

```bash
npx prisma db push
```

### Seed Database

```bash
npm run seed
```

---

## Running The Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| npm run dev  | Start development server |
| npm start    | Start production server  |
| npm run seed | Seed database            |

---

## Why This Project?

The goal of this project is not simply to build CRUD endpoints, but to simulate a production-oriented backend architecture that can evolve alongside business requirements.

It serves as a practical demonstration of:

- REST API Design
- Backend Architecture
- Database Modeling
- Error Handling Strategies
- Query Optimization
- Authentication & Authorization Concepts
- Scalable Project Structure

---

## Roadmap

### Authentication & Security

- JWT Authentication
- Refresh Tokens
- Role-Based Access Control (RBAC)
- Protected Routes

### API Improvements

- Pagination
- Validation Layer
- API Documentation
- Request Logging

### DevOps

- Docker Support
- CI/CD Pipeline
- Automated Testing

---

## Project Status

🚧 Active Development

The project is actively being developed and continuously improved with additional features, security enhancements, and infrastructure upgrades.

---

## Author

**Soroush Ghasemi**

Frontend & Full-Stack JavaScript Developer

GitHub: https://github.com/Soroush47
