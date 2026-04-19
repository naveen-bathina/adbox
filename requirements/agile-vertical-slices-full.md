# Agile Vertical Slice Issues (Tracer Bullets)

## 1. User Signup & Profile (AFK)

- Blocked by: None
- User stories: 1, 9

### What to build

Implement end-to-end user signup and profile management. Users can register with minimal info (age, gender, location, phone/email), authenticate via JWT, and view/edit their profile in the Flutter app. Data is stored in PostgreSQL via .NET Core microservice.

### Acceptance criteria

- [ ] User can sign up and log in via Flutter app
- [ ] JWT authentication is implemented and secure
- [ ] User profile is stored and retrievable from backend
- [ ] User can view and edit profile in app
- [ ] Automated tests for signup, login, and profile endpoints

---

## 2. Admin Login & Dashboard (AFK)

- Blocked by: None
- User stories: 10, 14

### What to build

Implement secure admin login and a basic dashboard in the React+TypeScript admin panel. Admins authenticate via JWT and see a dashboard with placeholder metrics.

### Acceptance criteria

- [ ] Admin can log in via web panel
- [ ] JWT authentication and RBAC for admin endpoints
- [ ] Dashboard displays dummy metrics (to be replaced later)
- [ ] Automated tests for login and dashboard

---

## 3. Ad Upload & Targeting (AFK)

- Blocked by: 2 (Admin Login)
- User stories: 11

### What to build

Enable admins to upload ad media, enter metadata, and set targeting criteria (age, gender, location) via the admin panel. Store ad data and files in backend and cloud storage.

### Acceptance criteria

- [ ] Admin can upload ad media and enter metadata
- [ ] Targeting fields are available and stored
- [ ] Ad data is persisted in PostgreSQL and media in cloud storage
- [ ] Automated tests for ad upload and retrieval

---

## 4. Survey Creation & Linking (AFK)

- Blocked by: 3 (Ad Upload)
- User stories: 12, 13

### What to build

Enable admins to create surveys, link them to ads, and set custom rewards. This includes React admin UI, .NET API endpoints, and PostgreSQL schema updates.

### Acceptance criteria

- [ ] Admin can create surveys with questions and attention checks
- [ ] Surveys can be linked to specific ads
- [ ] Custom point values can be set per survey
- [ ] Data is persisted and retrievable via API
- [ ] Automated tests for survey creation and linking

---

## 5. Ad Delivery & Survey Flow (AFK)

- Blocked by: 1, 4
- User stories: 2, 3, 4, 21

### What to build

Implement the user-facing flow: users receive targeted ads, must view the ad fully, then complete the linked survey (with attention checks) to earn points. Integrate Flutter UI, .NET API, and backend logic.

### Acceptance criteria

- [ ] Users receive and view targeted ads in the app
- [ ] Survey unlocks only after full ad view
- [ ] Users complete survey with attention checks
- [ ] Points are awarded and wallet updated
- [ ] Automated tests for the full flow

---

## 6. Wallet & Transaction History (AFK)

- Blocked by: 5
- User stories: 5

### What to build

Provide users with a wallet screen showing current balance and transaction history. Integrate Flutter UI, .NET API, and PostgreSQL.

### Acceptance criteria

- [ ] Users can view wallet balance in the app
- [ ] Transaction history (earnings, withdrawals) is displayed
- [ ] Data is accurate and up-to-date
- [ ] Automated tests for wallet endpoints

---

## 7. UPI Withdrawal Request (AFK)

- Blocked by: 6
- User stories: 6, 15

### What to build

Allow users to request withdrawals via UPI. Admins can review, approve, or reject requests. Status updates and notifications are sent to users.

### Acceptance criteria

- [ ] Users can request withdrawal with UPI ID
- [ ] Admin can review/approve/reject requests
- [ ] Status and notifications update accordingly
- [ ] Automated tests for withdrawal flow

---

## 8. Push Notifications (AFK)

- Blocked by: 5
- User stories: 2, 7

### What to build

Integrate push notification service (Firebase Cloud Messaging) for points earned, withdrawal status, and admin messages.

### Acceptance criteria

- [ ] Push notifications sent for key events
- [ ] Mobile app receives and displays notifications
- [ ] Automated tests for notification triggers

---

## 9. Support & FAQ (AFK)

- Blocked by: 1
- User stories: 8, 17

### What to build

Implement FAQ/help section and support ticketing. Users can submit tickets; admins can view/respond.

### Acceptance criteria

- [ ] FAQ/help available in app
- [ ] Users can submit support tickets
- [ ] Admins can view/respond to tickets
- [ ] Automated tests for support endpoints

---

## 10. Security & Compliance (HITL)

- Blocked by: None (parallel)
- User stories: 9, 20, 21

### What to build

Conduct security review, implement RBAC, input validation, audit logging, and privacy/terms screens.

### Acceptance criteria

- [ ] Security review completed
- [ ] RBAC and input validation enforced
- [ ] Audit logging and privacy/terms implemented
- [ ] Automated security and compliance tests

---

## 11. Analytics & Export (AFK)

- Blocked by: 2, 5, 7
- User stories: 14, 16, 22

### What to build

Provide admin analytics dashboard and CSV export for impressions, completions, users, and payouts.

### Acceptance criteria

- [ ] Analytics dashboard displays key metrics
- [ ] Data can be filtered and exported as CSV
- [ ] Automated tests for analytics endpoints

---
