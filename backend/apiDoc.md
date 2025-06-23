# API Documentation

## Base URL
All endpoints are under the `/api` base path.

## Authentication
- All protected routes require valid JWT tokens
- Tokens are provided through:
  - `accessToken` cookie (for authentication)
  - `refreshToken` cookie (for token refresh)
 

## Auth Endpoints
### POST `/auth/signup`
- Description: Create a new user account
- Request Body:
  ```json
  {
    "name": string (required),
    "email": string (required),
    "password": string (required)
  }
  ```
- Response:
  ```json
  {
    "name": string
  }
  ```
- Status Codes:
  - 201: User created successfully
  - 400: Bad request
  - 401: Email already exists
  - 500: Internal server error

### POST `/auth/login`
- Description: Authenticate existing user
- Request Body:
  ```json
  {
    "email": string (required),
    "password": string (required)
  }
  ```
- Response:
  ```json
  {
    "name": string
  }
  ```
  Sets HTTP-only cookies for accessToken and refreshToken
- Status Codes:
  - 200: Login successful
  - 400: Bad request
  - 401: Invalid credentials
  - 500: Internal server error

### POST `/auth/logout`
- Description: Logout current user
- Response:
  - Clears accessToken and refreshToken cookies
- Status Codes:
  - 200: Logout successful
  - 500: Internal server error

## User Endpoints
### GET `/user`
- Description: Get current user information
- Requires Authentication: Yes (accessToken)
- Response:
  ```json
  {
    "name": string,
    "email": string
  }
  ```
- Status Codes:
  - 200: User info retrieved
  - 401: Unauthorized
  - 500: Internal server error

### PATCH `/user`
- Description: Update user information
- Requires Authentication: Yes (accessToken)
- Request Body:
  ```json
  {
    "name": string (optional),
    "email": string (optional)
  }
  ```
- Status Codes:
  - 200: User updated successfully
  - 400: Bad request
  - 401: Unauthorized
  - 500: Internal server error

### DELETE `/user`
- Description: Delete user account
- Requires Authentication: Yes (accessToken)
- Status Codes:
  - 200: User deleted successfully
  - 401: Unauthorized
  - 500: Internal server error

### PATCH `/user/password`
- Description: Update user password
- Requires Authentication: Yes (accessToken)
- Request Body:
  ```json
  {
    "old_password": string (required),
    "new_password": string (required)
  }
  ```
- Status Codes:
  - 200: Password updated successfully
  - 400: Bad request
  - 401: Unauthorized
  - 500: Internal server error

## Note Endpoints
### POST `/notes`
- Description: Create a new note
- Requires Authentication: Yes (accessToken)
- Request Body:
  ```json
  {
    "title": string (required),
    "note": string (required),
    "tag": string (optional)
  }
  ```
- Status Codes:
  - 201: Note created successfully
  - 400: Bad request
  - 401: Unauthorized
  - 500: Internal server error

### GET `/notes`
- Description: Get all notes for current user
- Requires Authentication: Yes (accessToken)
- Response:
  ```json
  [
    {
      "note_id": number,
      "title": string,
      "note": string,
      "tag": string,
      "pinned": boolean,
      "created_at": string
    }
  ]
  ```
- Status Codes:
  - 200: Notes retrieved successfully
  - 401: Unauthorized
  - 500: Internal server error

### GET `/notes/:id`
- Description: Get a specific note
- Requires Authentication: Yes (accessToken)
- Path Parameters:
  ```
  {
    "id": number (required)
  }
  ```
- Response:
  ```json
  {
    "note_id": number,
    "title": string,
    "note": string,
    "tag": string,
    "pinned": boolean,
    "created_at": string
  }
  ```
- Status Codes:
  - 200: Note retrieved successfully
  - 404: Note not found
  - 401: Unauthorized
  - 500: Internal server error

### PATCH `/notes/:id`
- Description: Update a specific note
- Requires Authentication: Yes (accessToken)
- Path Parameters:
  ```
  {
    "id": number (required)
  }
  ```
- Request Body:
  ```json
  {
    "title": string (optional),
    "note": string (optional),
    "tag": string (optional)
  }
  ```
- Status Codes:
  - 200: Note updated successfully
  - 400: Bad request
  - 401: Unauthorized
  - 404: Note not found
  - 500: Internal server error

### DELETE `/notes/:id`
- Description: Delete a specific note
- Requires Authentication: Yes (accessToken)
- Path Parameters:
  ```
  {
    "id": number (required)
  }
  ```
- Status Codes:
  - 200: Note deleted successfully
  - 401: Unauthorized
  - 404: Note not found
  - 500: Internal server error

### PATCH `/notes/:id/pin`
- Description: Pin/Unpin a note
- Requires Authentication: Yes (accessToken)
- Path Parameters:
  ```
  {
    "id": number (required)
  }
  ```
- Status Codes:
  - 200: Note updated successfully
  - 401: Unauthorized
  - 404: Note not found
  - 500: Internal server error

## Error Handling
The API returns standard HTTP status codes and error messages in JSON format:
```json
{
  "error": string
}
```

Common Status Codes:
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Internal server error
