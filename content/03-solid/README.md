# App

## Functional Requirements

- [ ] Should register successfully
- [ ] Should authenticate correctly
- [ ] Should retrieve authenticated user profile
- [ ] Should retrieve user check-ins
- [ ] Should view check-in history
- [ ] Should search nearby gyms
- [ ] Should search gyms by name
- [ ] Should validate user check-ins

## Business Rules

- [ ] Should not allow a user to
  - [ ] Register with an existing email
  - [ ] Check-in if they are not authenticated
  - [ ] Check-in twice same day
  - [ ] Check-in if they are not nearby (100m) a gym
- [ ] Check-in should be validated until 20 minutes after created
- [ ] Check-in should bt validated by the gym admin

## Non-Functional Requirements

- [ ] Passwords should be hashed
- [ ] Data should be stored in a PostgreSQL database
- [ ] All data lists should be paginated with a limit of 20 items per page
- [ ] User should be identified by JWT token
