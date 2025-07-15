#!/bin/bash

echo "🚀 Deploying Authentication System to Kubernetes..."

# Build the Docker image
echo "📦 Building auth-backend Docker image..."
docker build -t auth-backend:latest ./auth-backend

# Apply Kubernetes configurations
echo "⚙️  Applying Kubernetes configurations..."
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Wait for deployments to be ready
echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/auth-backend-deployment
kubectl wait --for=condition=available --timeout=300s deployment/mongodb-deployment
kubectl wait --for=condition=available --timeout=300s deployment/frontend-deployment

# Show status
echo "📊 Deployment Status:"
kubectl get pods
echo ""
kubectl get services

echo ""
echo "✅ Authentication System deployed successfully!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:30081"
echo "   Backend API: http://localhost:30001"
echo "   Health Check: http://localhost:30001/health"
echo ""
echo "🧪 Test the API:"
echo "   Register: curl -X POST http://localhost:30001/api/auth/register -H 'Content-Type: application/json' -d '{\"username\":\"test\",\"email\":\"test@example.com\",\"password\":\"password123\"}'"
echo "   Login: curl -X POST http://localhost:30001/api/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'"