# Diet Tracker API

## Functional Requirements

- [ ] Should be able to register a user
- [ ] Should be able to authenticate a user
- [ ] Should be able to register a meal, with the following information:
    > *Meals should be related to a user.*
  - Label
  - Description
  - Date and Time
  - Is it in or out of the diet
- [ ] Should be able to edit a meal, by changing all the data above
- [ ] Should be able to delete a meal
- [ ] Should be able to list all meals of a user
- [ ] Should be able to view a single meal
- [ ] Should be able to retrieve the metrics of a user
  - [ ] Total number of meals registered
  - [ ] Total number of meals in the diet
  - [ ] Total number of meals out of the diet
  - [ ] Best sequence of meals in the diet

## Non-Functional Requirements

- [ ] User should be able to log in with a username, email and password
- [ ] All data lists should be paginated with a limit of 20 items per page
- [ ] User should be identified by JWT token
- [ ] Password should be hashed
- [ ] Data should be stored in a PostgreSQL database

## Business Rules

- [ ] User should only be able to view, edit and delete meals he created
- [ ] Meals label should have a maximum of 100 characters
- [ ] Should not allow to create a user with an existing username or email
