# Agile Issue Templates: Vertical Slices

## 1. User Signup & Profile

### What to build

Implement end-to-end user signup and profile management. Users can register with minimal info (age, gender, location, phone/email), authenticate via JWT, and view/edit their profile in the Flutter app. Data is stored in PostgreSQL via .NET Core microservice.

### Acceptance criteria

- [ ] User can sign up and log in via Flutter app
- [ ] JWT authentication is implemented and secure
- [ ] User profile is stored and retrievable from backend
- [ ] User can view and edit profile in app
- [ ] Automated tests for signup, login, and profile endpoints

### Blocked by

None – can start immediately

---

## 2. Admin Login & Dashboard

### What to build

Implement secure admin login and a basic dashboard in the React+TypeScript admin panel. Admins authenticate via JWT and see a dashboard with placeholder metrics.

### Acceptance criteria

- [ ] Admin can log in via web panel
- [ ] JWT authentication and RBAC for admin endpoints
- [ ] Dashboard displays dummy metrics (to be replaced later)
- [ ] Automated tests for login and dashboard

### Blocked by

None – can start immediately

---

## 3. Ad Upload & Targeting

### What to build

Enable admins to upload ad media, enter metadata, and set targeting criteria (age, gender, location) via the admin panel. Store ad data and files in backend and cloud storage.

### Acceptance criteria

- [ ] Admin can upload ad media and enter metadata
- [ ] Targeting fields are available and stored
- [ ] Ad data is persisted in PostgreSQL and media in cloud storage
- [ ] Automated tests for ad upload and retrieval

### Blocked by

Admin Login & Dashboard

---

## 4. Survey Creation & Linking

### What to build

Enable admins to create surveys, link them to ads, and set custom rewards. This includes React admin UI, .NET API endpoints, and PostgreSQL schema updates.

### Acceptance criteria

- [ ] Admin can create surveys with questions and attention checks
- [ ] Surveys can be linked to specific ads
- [ ] Custom point values can be set per survey
- [ ] Data is persisted and retrievable via API
- [ ] Automated tests for survey creation and linking

### Blocked by

Ad Upload & Targeting

---

## 5. Ad Delivery & Survey Flow

### What to build

Implement the user-facing flow: users receive targeted ads, must view the ad fully, then complete the linked survey (with attention checks) to earn points. Integrate Flutter UI, .NET API, and backend logic.

### Acceptance criteria

- [ ] Users receive and view targeted ads in the app
- [ ] Survey unlocks only after full ad view
- [ ] Users complete survey with attention checks
- [ ] Points are awarded and wallet updated
- [ ] Automated tests for the full flow

### Blocked by

User Signup & Profile, Survey Creation & Linking

---

## 6. Wallet & Transaction History

### What to build

Provide users with a wallet screen showing current balance and transaction history. Integrate Flutter UI, .NET API, and PostgreSQL.

### Acceptance criteria

- [ ] Users can view wallet balance in the app
- [ ] Transaction history (earnings, withdrawals) is displayed
- [ ] Data is accurate and up-to-date
- [ ] Automated tests for wallet endpoints

### Blocked by

Ad Delivery & Survey Flow

---
