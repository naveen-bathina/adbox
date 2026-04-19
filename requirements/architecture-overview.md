# High-Level Architecture Overview

## Microservices

- .NET Core for each service (User, Ad, Survey, Wallet, Admin, Notification, etc.)
- CQRS and clean architecture
- PostgreSQL for all services
- RabbitMQ for messaging
- Docker for containerization
- API Gateway (Ocelot or YARP)

## Frontend

- Flutter mobile app
- React + TypeScript admin panel
- Tailwind CSS, Headless UI/Radix UI

## Security

- JWT authentication
- RBAC for admin endpoints
- HTTPS, secure headers, input validation, audit logging

## DevOps

- Docker Compose for local, Kubernetes for production
- GitHub Actions for CI/CD
- Environment variables for secrets/config

## Notifications

- Firebase Cloud Messaging for push

## File Storage

- AWS S3 or Azure Blob for ad media

## Scalability

- Microservices, container orchestration, stateless services

## Diagram

```
[Mobile App]         [Admin Panel]
     |                    |
     | REST API           | REST API
     |                    |
 [API Gateway] <-------> [Microservices]
     |                    |
 [PostgreSQL]      [RabbitMQ]      [Cloud Storage]
     |                    |
 [CI/CD, Docker, K8s, GitHub]
```
