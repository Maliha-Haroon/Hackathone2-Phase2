# Setting up the Database Locally

## Using SQLite (Default)

SQLite is file-based and doesn't require a separate database server installation. This is the default and recommended option for this project.

1. The database file will be automatically created when you run the application.
2. The default database location is `todo.db` in the backend directory.
3. You can customize the location by updating your .env file:
   ```
   DATABASE_URL=sqlite:///./todo.db
   ```

## Running Migrations

The application will automatically create the required tables when you start it for the first time, thanks to the initialization code in main.py.

## Note

SQLite is perfect for development and small to medium-sized applications. The database file (`todo.db`) will be created automatically in the backend directory when you first run the application.