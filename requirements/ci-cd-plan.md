# CI/CD Plan

## Goals

- Automated build, test, and deploy for all services and apps
- Always-shippable main branch
- Secure handling of secrets and environment variables

## Tools

- GitHub Actions for CI/CD pipelines
- Docker for containerization
- Docker Compose for local, Kubernetes for production

## Workflow

1. Feature branch created for each new feature/bug
2. PR opened; triggers build and test workflows
3. On PR merge to main:
   - Build and test all services/apps
   - Build Docker images and push to registry
   - Deploy to staging/production (Kubernetes or cloud provider)
4. Rollback and monitoring steps in place

## Example GitHub Actions Workflow (backend)

```yaml
name: .NET Core CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --no-restore --configuration Release
      - name: Test
        run: dotnet test --no-build --verbosity normal
      - name: Build Docker image
        run: docker build -t ${{ secrets.REGISTRY_URL }}/adbox-backend:${{ github.sha }} .
      # Add steps for push/deploy as needed
```

## Notes

- Use separate workflows for mobile, web, and each microservice
- Store secrets in GitHub Secrets
- Document deployment steps in DEPLOYMENT.md
