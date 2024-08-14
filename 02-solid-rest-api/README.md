# App

## Functional Requirements

- [ ] Should be able to register
- [ ] Should be able to authenticate
- [ ] Should be able to get an authenticated user profile
- [ ] Should be able to get check-ins of a user
- [ ] Should be able to get check-ins history
- [ ] Should be able to search for nearby gyms
- [ ] Should be able to search for gyms by name
- [ ] Should be able to validate a check-in of a user

## Business Rules

- [ ] Should not allow a user to register with a duplicated email
- [ ] Should not allow a user to check-in if they are not authenticated
- [ ] Should not allow a user to check-in twice same day
- [ ] Should not allow a user to check-in if they are not nearby (100m) a gym
- [ ] Check-in should be validated until 20 minutes after created
- [ ] Check-in should bt validated by the gym admin

## Non-Functional Requirements

- [ ] Passwords should be hashed
- [ ] Data should be stored in a PostgreSQL database
- [ ] All data lists should be paginated with a limit of 20 items per page
- [ ] User should be identified by JWT token
