# Gymmy

## Functional Requirements

- [x] Should register successfully
- [ ] Should authenticate correctly
- [x] Should retrieve the authenticated user profile
- [x] Should be able to user check-in gym
- [ ] Should retrieve the user's check-ins
- [ ] Should view user's check-in history
- [ ] Should search nearby gyms
- [ ] Should search gyms by name
- [ ] Should validate user's check-in
- [ ] Should register a new gym

## Business Rules

- [ ] Should not allow a user to
  - [x] Register with an existing email
  - [ ] Check-in if they are not authenticated
  - [ ] Check-in twice same day
  - [ ] Check-in if they are not nearby (100m) a gym
- [ ] Check-in should be validated until 20 minutes after created
- [ ] Check-in should be validated by the gym admin
- [ ] Gyms should be created by the admins, only

## Non-Functional Requirements

- [x] Passwords must be hashed
- [x] Data should be stored in a PostgreSQL database
- [ ] All data lists should be paginated with a limit of 20 items per page
- [ ] User should be identified by JWT token
