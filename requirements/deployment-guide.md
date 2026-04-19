# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL, RabbitMQ, and cloud storage credentials
- GitHub Actions configured for CI/CD

## Local Development

1. Clone the repository
2. Copy .env.example to .env and fill in secrets
3. Run `docker-compose up --build` to start all services
4. Access services at their respective ports (see docker-compose.yml)

## Staging/Production Deployment

1. Set up Kubernetes cluster or cloud container service
2. Push Docker images to container registry
3. Apply Kubernetes manifests or use Helm charts
4. Set environment variables/secrets in cloud provider
5. Configure domain, HTTPS, and monitoring

## Database Migrations

- Use EF Core migrations for .NET services
- Run migrations on deployment or as a CI/CD step

## Rollback

- Use Docker image tags and Kubernetes rollouts to revert

## Monitoring & Logging

- Integrate with cloud logging/monitoring (e.g., Azure Monitor, AWS CloudWatch, Grafana)

## Notes

- Keep DEPLOYMENT.md updated as infrastructure evolves
