# Run the Neon Todo App Locally

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.11 or higher)
- SQLite (included with Python, no additional installation needed)

## Step-by-Step Instructions

### 1. Clone or Download the Repository

If you haven't already, clone or download the project to your local machine.

### 2. Set up the Backend

1. Open a terminal/command prompt and navigate to the backend directory:
   ```
   cd hackathon-todo-phase2/backend
   ```

2. Create a virtual environment (recommended):
   - On Windows:
     ```
     python -m venv venv
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up your environment variables by creating a `.env` file in the backend directory:
   ```
   DATABASE_URL=sqlite:///./todo.db
   SECRET_KEY=your-super-secret-key-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```
   
   Note: SQLite is the default database. The database file (`todo.db`) will be automatically created in the backend directory when you first run the application.

5. Run the backend server:
   ```
   uvicorn main:app --reload
   ```
   
   The backend will be available at `http://localhost:8000`

### 3. Set up the Frontend

1. Open a new terminal/command prompt and navigate to the frontend directory:
   ```
   cd hackathon-todo-phase2/frontend
   ```

2. Install the required Node.js packages:
   ```
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Run the frontend development server:
   ```
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

### 4. Access the Application

1. Open your browser and go to `http://localhost:3000`
2. You can now register a new account or log in if you already have one
3. Start using your Neon Todo App with the beautiful neon-themed UI!

### 5. API Documentation

The backend API is documented with Swagger UI. Visit `http://localhost:8000/docs` to view the API documentation and test endpoints directly from your browser.

## Troubleshooting

- If you get a database connection error, make sure the backend directory has write permissions to create the SQLite database file
- If the frontend can't connect to the backend, verify that both services are running and the API URL is correctly set
- Make sure the ports 3000 (frontend) and 8000 (backend) are not being used by other applications

Enjoy your locally hosted Neon Todo App!