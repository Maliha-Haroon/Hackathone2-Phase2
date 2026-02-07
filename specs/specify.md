# Todo Full-Stack App - Specification (WHAT)

## Project Overview
A multi-user web-based todo application with authentication and persistent storage.

## User Journeys

### Journey 1: User Registration & Login
**As a new user**
- I want to create an account
- So that I can have my own private todo list

**Acceptance Criteria:**
- User can sign up with email and password
- Password must be at least 8 characters
- Email must be unique
- User is automatically logged in after signup
- JWT token is issued and stored

**As a returning user**
- I want to log in to my account
- So that I can access my todo list

**Acceptance Criteria:**
- User enters email and password
- System validates credentials
- JWT token issued on success
- User redirected to dashboard
- Error message on invalid credentials

### Journey 2: Add a Task (Authenticated)
**As an authenticated user**
- I want to add a new todo task
- So that I can track things I need to do

**Acceptance Criteria:**
- User must be logged in
- Form has title field (required)
- Form has description field (optional)
- Task saved to database with user_id
- Task appears immediately in user's list
- Other users cannot see this task

### Journey 3: View My Tasks
**As an authenticated user**
- I want to see only my tasks
- So that I can manage my personal todo list

**Acceptance Criteria:**
- Only tasks belonging to logged-in user are shown
- Tasks display: title, description, status, created date
- Empty list shows "No tasks yet" message
- Tasks sorted by creation date (newest first)

### Journey 4: Update My Task
**As an authenticated user**
- I want to update my task details
- So that I can correct mistakes or add information

**Acceptance Criteria:**
- User can only update their own tasks
- Can update title and/or description
- Changes saved to database
- UI updates immediately
- Cannot update other users' tasks

### Journey 5: Delete My Task
**As an authenticated user**
- I want to delete my task
- So that I can remove completed or unwanted tasks

**Acceptance Criteria:**
- User can only delete their own tasks
- Confirmation dialog appears
- Task removed from database
- UI updates immediately
- Cannot delete other users' tasks

### Journey 6: Mark Task Complete
**As an authenticated user**
- I want to mark tasks as complete
- So that I can track my progress

**Acceptance Criteria:**
- User can only toggle their own tasks
- Checkbox or button to toggle status
- Status saved to database
- Visual indicator (checkmark, strikethrough)
- Can toggle back to incomplete

### Journey 7: Logout
**As a logged-in user**
- I want to log out
- So that my account is secure

**Acceptance Criteria:**
- Logout button visible when logged in
- JWT token cleared from storage
- Redirected to login page
- Cannot access tasks without logging back in

## Features

### F1: User Authentication
**Signup**
- Email (required, unique, valid format)
- Password (required, min 8 chars)
- Name (optional)
- Returns JWT token on success

**Login**
- Email (required)
- Password (required)
- Returns JWT token on success
- Error message on failure

**Logout**
- Clears JWT from frontend
- Redirects to login

### F2: Task CRUD (All require authentication)

**Create Task**
- POST `/api/users/{user_id}/tasks`
- Headers: `Authorization: Bearer <token>`
- Body: `{title: string, description?: string}`
- Returns: Created task with ID

**Read Tasks**
- GET `/api/users/{user_id}/tasks`
- Headers: `Authorization: Bearer <token>`
- Query params: `?status=all|completed|pending`
- Returns: Array of user's tasks only

**Update Task**
- PUT `/api/users/{user_id}/tasks/{task_id}`
- Headers: `Authorization: Bearer <token>`
- Body: `{title?: string, description?: string}`
- Returns: Updated task
- Error if task doesn't belong to user

**Delete Task**
- DELETE `/api/users/{user_id}/tasks/{task_id}`
- Headers: `Authorization: Bearer <token>`
- Returns: Success message
- Error if task doesn't belong to user

**Toggle Complete**
- PATCH `/api/users/{user_id}/tasks/{task_id}/complete`
- Headers: `Authorization: Bearer <token>`
- Returns: Updated task with new status

## Data Models

### User Model
```typescript
interface User {
  id: string;          // UUID
  email: string;       // Unique, validated
  name?: string;       // Optional
  password_hash: string; // Never exposed to frontend
  created_at: Date;
  updated_at: Date;
}
```

### Task Model
```typescript
interface Task {
  id: number;          // Auto-increment
  user_id: string;     // Foreign key → users.id
  title: string;       // Max 200 chars
  description?: string; // Max 1000 chars
  completed: boolean;  // Default false
  created_at: Date;
  updated_at: Date;
}
```

## Security Requirements

### Authentication
- All task endpoints require valid JWT
- JWT must contain user_id claim
- Backend validates JWT signature
- Expired tokens rejected (401)

### Authorization
- Users can only access their own tasks
- Backend must verify task ownership before operations
- API returns 403 if user tries to access another user's task

### Data Validation
- Frontend: Form validation before submission
- Backend: Pydantic models validate all inputs
- SQL injection prevention (ORM handles this)
- XSS prevention (React escapes by default)

## UI/UX Requirements

### Pages
1. **Login Page** (`/login`)
   - Email input
   - Password input
   - "Sign Up" link
   - Error messages

2. **Signup Page** (`/signup`)
   - Email input
   - Password input
   - Name input (optional)
   - "Login" link
   - Error messages

3. **Dashboard** (`/dashboard`) - Protected
   - Task list
   - Add task form
   - Logout button
   - Each task has: edit, delete, complete buttons

### Responsive Design
- Mobile-friendly (Tailwind responsive classes)
- Works on screens 320px+
- Touch-friendly buttons

### Error Handling
- Network errors: "Unable to connect"
- Auth errors: "Invalid credentials"
- Validation errors: Inline field errors
- Server errors: "Something went wrong"

## API Error Responses

### Standard Error Format
```json
{
  "detail": "Error message here"
}
```

### Status Codes
- 200: Success (GET, PUT, PATCH)
- 201: Created (POST)
- 400: Bad Request (validation error)
- 401: Unauthorized (missing/invalid JWT)
- 403: Forbidden (not authorized for resource)
- 404: Not Found (task doesn't exist)
- 500: Server Error

## Environment Variables

### Frontend (.env.local)