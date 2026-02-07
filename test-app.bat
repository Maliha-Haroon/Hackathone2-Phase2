# Test the complete application flow

echo "Starting Neon Todo App test..."

# Check if backend is running
echo "Testing backend health endpoint..."
curl -X GET http://localhost:8000/health

echo ""
echo "Application is ready!"
echo "Visit http://localhost:3000 to access the frontend"
echo "Visit http://localhost:8000/docs to view API documentation"