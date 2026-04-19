# Product Requirements Document (PRD)

## Problem Statement

Users and advertisers lack a seamless, secure, and rewarding platform where users can view targeted advertisements, participate in surveys, and earn points that can be withdrawn as real currency. Advertisers need a way to reach relevant audiences and collect survey data, while admins require robust tools for management, analytics, and fraud prevention.

## Solution

Build a scalable, secure, and modern microservices-based platform with:

- A Flutter mobile app for users to receive ads, complete surveys, and manage their wallet
- A React + TypeScript admin panel with Tailwind CSS for ad/survey management, analytics, and payout processing
- A .NET Core backend using CQRS, clean architecture, PostgreSQL, RabbitMQ, and Docker for microservices, with high security and future scalability

## Implementation Status (as of April 20, 2026)

- Core CRUD for users, surveys, and ads: ✅ Complete (backend, web, mobile)
- User authentication (signup, login): ✅ Complete (web, mobile)
- Admin dashboard: ✅ Complete (web)
- User rewards/points system: ✅ Complete (backend, web, mobile)
- Full test coverage: ✅ Complete (backend, web, mobile)
- Production-ready builds: ✅ Backend, web; ⚠️ Mobile (build warning, tests pass)

---

## User Stories (Status as of April 20, 2026)

- [x] 1. As a user, I want to sign up with minimal information, so that I can quickly start using the app. (**Complete**)
- [ ] 2. As a user, I want to receive push notifications for new ads/surveys, so that I don’t miss earning opportunities. (**Pending FCM integration**)
- [x] 3. As a user, I want to view targeted ads, so that the content is relevant to me. (**Complete**)
- [x] 4. As a user, I want to complete surveys after viewing ads, so that I can earn points. (**Complete**)
- [x] 5. As a user, I want to see my wallet balance and transaction history, so that I can track my earnings. (**Complete**)
- [x] 6. As a user, I want to request withdrawals via UPI, so that I can convert points to real money. (**Complete**)
- [ ] 7. As a user, I want to receive notifications for points earned and withdrawal status, so that I stay informed. (**Pending FCM integration**)
- [ ] 8. As a user, I want to contact support and view FAQs, so that I can resolve issues. (**Pending support/FAQ module**)
- [~] 9. As a user, I want my data to be secure and my privacy respected, so that I feel safe using the app. (**Partially complete, ongoing**)
- [x] 10. As an admin, I want to log in securely, so that only authorized personnel can manage the platform. (**Complete**)
- [x] 11. As an admin, I want to upload and manage ads with targeting options, so that campaigns reach the right users. (**Complete**)
- [x] 12. As an admin, I want to create and link surveys to ads, so that I can collect user feedback. (**Complete**)
- [x] 13. As an admin, I want to set custom rewards for surveys, so that I can incentivize participation. (**Complete**)
- [~] 14. As an admin, I want to view analytics on ad impressions, survey completions, user growth, and payouts, so that I can measure performance. (**Basic dashboard done, advanced analytics/export pending**)
- [~] 15. As an admin, I want to review and process withdrawal requests, so that users can be paid securely. (**Basic flow done, payout automation pending**)
- [x] 16. As an admin, I want to manage user accounts and view their activity, so that I can monitor platform health. (**Complete**)
- [ ] 17. As an admin, I want to respond to support tickets, so that user issues are resolved. (**Pending support module**)
- [x] 18. As a developer, I want the system to be modular and scalable, so that it can grow with demand. (**Complete**)
- [x] 19. As a developer, I want to use Docker and RabbitMQ, so that services are easy to deploy and communicate reliably. (**Complete**)
- [x] 20. As a developer, I want to enforce security best practices, so that user data and platform integrity are protected. (**Complete**)
- [~] 21. As a user, I want to be protected from fraud and abuse, so that the rewards system remains fair. (**Partially complete, ongoing**)
- [ ] 22. As an admin, I want to export analytics data, so that I can perform further analysis. (**Pending advanced analytics/export**)

## Implementation Decisions

- Use microservices architecture with .NET Core for each domain (User, Ad, Survey, Wallet, Admin, Notification, etc.)
- PostgreSQL as the primary database for all services
- CQRS and clean architecture patterns for maintainability and testability
- RabbitMQ for inter-service communication and event-driven workflows
- Docker for containerization; Docker Compose for local, Kubernetes for production orchestration
- JWT authentication and RBAC for security
- Flutter for the mobile app, React + TypeScript + Tailwind CSS for the admin panel
- File storage for ad media (e.g., AWS S3 or Azure Blob)
- Push notifications via Firebase Cloud Messaging
- Tailwind CSS and Headless UI/Radix UI for modern, accessible web design
- All sensitive configuration via environment variables

## Testing Decisions

- Focus on testing external behavior (API endpoints, UI flows, event handling), not internal implementation details
- Unit tests for CQRS handlers, domain logic, and validation
- Integration tests for API endpoints and service interactions
- End-to-end tests for critical user and admin flows (signup, ad/survey completion, withdrawal)
- Security and input validation tests
- Prior art: Use patterns from established .NET, React, and Flutter testing libraries

## Out of Scope

- Automated UPI payouts (manual processing in MVP)
- Third-party advertiser self-serve portals (admin-managed only in MVP)
- Advanced behavioral targeting (demographic targeting only in MVP)
- Internationalization/localization (single language in MVP)
- Non-UPI withdrawal methods

## Further Notes

- The architecture is designed for future scalability and easy addition of new features (e.g., automated payouts, advanced analytics, new reward types)
- Security, privacy, and fraud prevention are prioritized throughout the stack
- All modules are designed for independent deployment and scaling
