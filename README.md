# Authentication System

A complete authentication system with JWT tokens, user registration, login, and protected routes.

## Architecture

- **Backend**: Node.js/Express API with JWT authentication
- **Database**: MongoDB for user storage
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Deployment**: Kubernetes with Docker containers

## Features

- User registration with validation
- User login with JWT tokens
- Password hashing with bcrypt
- Protected routes with middleware
- Role-based access control
- Responsive frontend interface

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB
- Docker (optional)

### Backend Setup
```bash
cd auth-backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
Open `frontend/index.html` in your browser or serve with a local server.

## Kubernetes Deployment

### Quick Deploy
```bash
# One-command deployment
./deploy.sh
```

### Manual Deploy
```bash
# Build the backend Docker image
docker build -t auth-backend:latest ./auth-backend

# Apply Kubernetes configurations
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Access the Application
- Frontend: http://localhost:30081
- Backend API: http://localhost:30001
- Health Check: http://localhost:30001/health

### Cleanup
```bash
# Remove all resources
./cleanup.sh
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Request Examples

#### Register
```json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Environment variable configuration
- Kubernetes secrets for sensitive data

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Testing

Test the API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:30001/health

# Register user
curl -X POST http://localhost:30001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:30001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get user profile (replace TOKEN with actual JWT token from login/register)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:30001/api/auth/me
```