#!/bin/bash

echo "🧹 Cleaning up Authentication System from Kubernetes..."

# Delete Kubernetes resources
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml
kubectl delete -f configmap.yaml
kubectl delete -f secrets.yaml

# Remove Docker image (optional)
read -p "Do you want to remove the Docker image? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker rmi auth-backend:latest
    echo "🗑️  Docker image removed"
fi

echo "✅ Cleanup completed!"