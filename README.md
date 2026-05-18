# GigFlow - Smart Leads Dashboard

A full-stack MERN application for managing business leads with role-based access control, advanced filtering, and a clean modern UI.

## Features

- **Authentication System**: User registration and login with JWT and role-based access control (Admin vs. Sales User).
- **Lead Management**: Full CRUD operations for leads.
- **Advanced Filtering**: Filter by status, source, and search by name or email.
- **Pagination**: Efficient backend pagination (10 leads per page).
- **CSV Export**: Export lead data to CSV format.
- **Responsive UI**: Clean, modern dashboard built with TailwindCSS and Lucide icons.
- **Docker Support**: Easily run the entire stack using Docker Compose.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, React Router, Lucide React.
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt.
- **State Management**: React Context API.
- **Icons**: Lucide React.
- **Notifications**: React Hot Toast.

## Project Structure

```text
GigFlow/
├── backend/
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Auth and role middleware
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   └── index.ts     # Entry point
│   ├── .env             # Environment variables
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth context
│   │   ├── hooks/       # Custom hooks (useDebounce)
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript interfaces
│   │   └── utils/       # API and helper functions
│   ├── .env             # Frontend config
│   └── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GigFlow
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Running with Docker (Optional)

> **Note**: You must have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your machine for these commands to work. If you see `docker: command not found`, please use the **Local Installation** steps below.

```bash
# If you have Docker Compose V1
docker-compose up --build

# If you have Docker Compose V2 (Recommended)
docker compose up --build
```

### Local Installation (Recommended if Docker is not installed)

1. **MongoDB**: Ensure you have MongoDB installed locally or use a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string.
2. **Backend**:
   ```bash
   cd backend
   npm install
   # Create/update .env file with your MONGODB_URI
   npm run dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT

### Leads
- `GET /api/leads` - Get all leads (with query params: page, limit, search, status, source, sort)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead (Admin only)

## Deployment

- **Frontend**: Deploy on Vercel.
- **Backend**: Deploy on Render.
- **Database**: Use MongoDB Atlas.

