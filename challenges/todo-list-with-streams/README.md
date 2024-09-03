# TO-DO List with Streams

A simple API to manage a to-do list. Its features are:

- Create a task
- List all tasks
- Update a task by `id`
- Delete a task by `id`
- Mark a task as complete by `id`
- Most important: **Import tasks in bulk by a CSV file**

## Data Structure

- `id` - Unique identifier of each task
- `title` - Task title
- `description` - Detailed task description
- `completed_at` - Date when the task was completed. The initial value should be `null`
- `created_at` - Date when the task was created.
- `updated_at` - Should always be updated to the date when the task was updated.

## Routes

- `POST - /tasks`
  - Should create a task in the database,   sending the fields `title` and `description`.
- `GET - /tasks`
  - Should list all tasks saved.
  - Should perform a search, filtering tasks by `title` and `description`
- `PUT - /tasks/:id`
  - Should update a task by `id`.
  - Should receive only the `title` and/or `description` to be updated.
  - Before updating, should be done a validation if the `id` belongs to a task saved in the database.
- `DELETE - /tasks/:id`
  - Should remove a task by `id`.
  - Before removing, should be done a validation if the `id` belongs to a task saved in the database.
- `PATCH - /tasks/:id/complete`
  - Should mark a task as complete or not.
  - Before the change, should be done a validation if the `id` belongs to a task saved in the database.

## About Importing CSV

Usually in an API, the import of a CSV happens by sending the file through another format, called `multipart/form-data`.

In this file, you should read the CSV and for each line, perform a request to the `POST - /tasks` route, passing the necessary fields.

Recommendation of the CSV format:

```csv
title,description
Task 01,Description of Task 01
Task 02,Description of Task 02
Task 03,Description of Task 03
Task 04,Description of Task 04
Task 05,Description of Task 05
```
