# Data Models (Core Entities)

## User

- id: UUID (PK)
- name: VARCHAR
- age: INT
- gender: VARCHAR
- location: VARCHAR
- phone: VARCHAR (unique)
- email: VARCHAR (unique)
- upi_id: VARCHAR (nullable)
- wallet_balance: DECIMAL
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

## Ad

- id: UUID (PK)
- title: VARCHAR
- description: TEXT
- media_url: VARCHAR
- targeting_age_min: INT
- targeting_age_max: INT
- targeting_gender: VARCHAR (nullable)
- targeting_location: VARCHAR (nullable)
- status: ENUM('active','inactive')
- created_at: TIMESTAMP

## Survey

- id: UUID (PK)
- ad_id: UUID (FK to Ad)
- questions: JSONB
- point_value: INT
- attention_checks: JSONB
- status: ENUM('active','inactive')
- created_at: TIMESTAMP

## SurveyResponse

- id: UUID (PK)
- user_id: UUID (FK to User)
- survey_id: UUID (FK to Survey)
- answers: JSONB
- is_valid: BOOLEAN
- completed_at: TIMESTAMP

## WalletTransaction

- id: UUID (PK)
- user_id: UUID (FK to User)
- type: ENUM('earn','withdraw')
- amount: DECIMAL
- status: ENUM('pending','completed','failed')
- related_survey_id: UUID (nullable, FK to Survey)
- created_at: TIMESTAMP

## WithdrawalRequest

- id: UUID (PK)
- user_id: UUID (FK to User)
- amount: DECIMAL
- upi_id: VARCHAR
- status: ENUM('pending','approved','rejected','paid')
- requested_at: TIMESTAMP
- processed_at: TIMESTAMP (nullable)

## Admin

- id: UUID (PK)
- email: VARCHAR (unique)
- password_hash: VARCHAR
- role: ENUM('admin','support')
- created_at: TIMESTAMP

## Notification

- id: UUID (PK)
- user_id: UUID (FK to User)
- type: VARCHAR
- message: TEXT
- read: BOOLEAN
- created_at: TIMESTAMP

## SupportTicket

- id: UUID (PK)
- user_id: UUID (FK to User)
- subject: VARCHAR
- message: TEXT
- status: ENUM('open','closed','pending')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
