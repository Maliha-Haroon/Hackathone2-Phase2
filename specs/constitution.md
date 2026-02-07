# Todo Full-Stack App - Constitution

## Project Principles

### 1. Architecture Philosophy
- **Separation of Concerns**: Frontend, Backend, and Database are independent
- **Stateless Backend**: Each request is independent, JWT for auth
- **API-First Design**: Backend exposes RESTful JSON API
- **Type Safety**: TypeScript in frontend, type hints in backend

### 2. Security Standards
- **Authentication Required**: All API endpoints require valid JWT
- **Data Isolation**: Users only see their own tasks
- **Password Security**: Passwords hashed with bcrypt
- **HTTPS Only**: Production must use SSL/TLS
- **CORS Configured**: Only allow trusted origins

### 3. Code Quality
- **Frontend**: 
  - Next.js App Router (not Pages Router)
  - Server Components by default
  - Client Components only when needed
  - Tailwind CSS for styling
  - No inline styles
  
- **Backend**:
  - FastAPI with async/await
  - Pydantic models for validation
  - SQLModel for database ORM
  - Proper error handling with HTTPException
  - Type hints everywhere

### 4. Database Standards
- **SQLModel ORM**: All database operations through ORM
- **Migrations**: Use Alembic for schema changes
- **Relationships**: Proper foreign keys (users → tasks)
- **Indexes**: On frequently queried fields
- **Timestamps**: created_at, updated_at on all entities

### 5. API Design
- **RESTful Conventions**: GET, POST, PUT, DELETE
- **Versioning**: All routes under `/api/`
- **User Scoping**: Routes include user context `/api/users/{user_id}/tasks`
- **Status Codes**: Proper HTTP status codes (200, 201, 400, 401, 404, 500)
- **Error Format**: Consistent JSON error responses

### 6. Authentication Flow
- Better Auth handles frontend authentication
- JWT tokens issued on login
- Tokens sent in `Authorization: Bearer <token>` header
- Backend validates JWT and extracts user_id
- Backend filters all data by authenticated user

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Better Auth
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.13+
- **Database ORM**: SQLModel
- **Auth**: JWT validation (PyJWT)
- **Deployment**: Render/Railway/Fly.io

### Database
- **System**: PostgreSQL 16
- **Hosting**: Neon Serverless
- **ORM**: SQLModel
- **Migrations**: Alembic

## Non-Negotiables

1. **Monorepo Structure**: Frontend and backend in same repo
2. **No Manual Coding**: Use Claude Code with Spec-Driven Development
3. **Authentication First**: No unauthenticated access to tasks
4. **Type Safety**: TypeScript frontend, type hints backend
5. **Git Workflow**: Meaningful commits, clear history
6. **Environment Variables**: No secrets in code
7. **Error Handling**: Graceful failures with user-friendly messages

## Project Structure