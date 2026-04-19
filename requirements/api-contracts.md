# API Contracts (High-Level)

## User Service

- POST /api/users/signup — Register new user
- POST /api/users/login — Authenticate user
- GET /api/users/profile — Get user profile (auth required)
- PUT /api/users/profile — Update user profile

## Admin Service

- POST /api/admin/login — Admin login
- GET /api/admin/dashboard — Dashboard metrics (auth required)

## Ad Service

- POST /api/ads — Upload new ad (admin)
- GET /api/ads — List ads (with targeting)
- GET /api/ads/:id — Get ad details

## Survey Service

- POST /api/surveys — Create survey (admin)
- GET /api/surveys — List surveys
- GET /api/surveys/:id — Get survey details
- POST /api/surveys/:id/response — Submit survey response

## Wallet Service

- GET /api/wallet — Get wallet balance/transactions
- POST /api/wallet/withdraw — Request withdrawal

## Notification Service

- GET /api/notifications — List notifications

## Support Service

- POST /api/support — Submit support ticket
- GET /api/support — List/view tickets (admin)

## Notes

- All endpoints use JWT auth where required
- All requests/responses use JSON
- Validation and error handling per REST best practices
