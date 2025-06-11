# API Documentation

## Base URL
All endpoints are under the `/api` base path.

## Authentication
- All protected routes require valid JWT tokens
- Tokens are provided through:
  - `accessToken` cookie (for authentication)
  - `refreshToken` cookie (for token refresh)

## Endpoints

### Authentication Routes

#### 1. POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": string,
  "email": string,
  "password": string
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 201 Created| User created successfully | `{ "name": string }` |
| 400 Bad Request | Missing required fields | - |
| 401 Unauthorized | Email already exists | `{ "error": "email already exist" }` |

---

#### 2. POST `/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": string,
  "password": string
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Login successful     | `{ "name": string }` |
| 401 Unauthorized | Invalid credentials | `{ "error": "email or password incorrect" }` |

---

#### 3. POST `/auth/logout`
Log out the current user.

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Logout successful    | - |
| 500 Internal Server Error | Logout failed | `{ "error": "Internal server error" }` |

### User Routes
All user routes require authentication through `accessToken`.

#### 1. GET `/user`
Get current user information.

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | User information retrieved | `{ "name": string, "email": string }` |
| 500 Internal Server Error | Failed to retrieve user info | `{ "error": "Internal server error" }` |

---

#### 2. PATCH `/user`
Update user information.

**Request Body:**
```json
{
  "name": string,
  "email": string
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Update successful     | - |
| 500 Internal Server Error | Update failed | `{ "error": "Internal server error" }` |

---

#### 3. DELETE `/user`
Delete user account.

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | User deleted successfully | - |
| 500 Internal Server Error | Deletion failed | `{ "error": "Internal server error" }` |

---

#### 4. PATCH `/user/password`
Update user password.

**Request Body:**
```json
{
  "old_password": string,
  "new_password": string
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Password updated successfully | - |
| 401 Unauthorized | Wrong old password | `{ "error": "wrong password" }` |
| 500 Internal Server Error | Update failed | `{ "error": "Internal server error" }` |

### Note Routes
All note routes require authentication through `accessToken`.

#### 1. POST `/notes`
Create a new note.

**Request Body:**
```json
{
  "title": string,
  "note": string,
  "tag": string (optional)
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 201 Created| Note created successfully | - |
| 400 Bad Request | Missing required fields | `{ "error": "provide all the request data" }` |

---

#### 2. GET `/notes`
Get all notes for the current user.

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Notes retrieved successfully | `[ { "note_id": integer, "title": string, "note": string, "tag": string, "created_at": string } ]` |
| 500 Internal Server Error | Failed to retrieve notes | `{ "error": "Internal server error" }` |

---

#### 3. GET `/notes/:id`
Get a specific note.

**Path Parameters:**
- `id`: note_id of the note to retrieve

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Note retrieved successfully | `{ "note_id": integer, "title": string, "note": string, "tag": string, "created_at": string }` |
| 404 Not Found | Note not found | - |

---

#### 4. PATCH `/notes/:id`
Update a specific note.

**Path Parameters:**
- `id`: note_id of the note to update

**Request Body:**
```json
{
  "title": string,
  "note": string
}
```

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Note updated successfully | - |
| 404 Not Found | Note not found | - |
| 500 Internal Server Error | Update failed | `{ "error": "Internal server error" }` |

---

#### 5. DELETE `/notes/:id`
Delete a specific note.

**Path Parameters:**
- `id`: note_id of the note to delete

**Responses:**
| Status Code | Description          | Response Body               |
|-------------|------------------------|------------------------------|
| 200 OK     | Note deleted successfully | - |
| 404 Not Found | Note not found | - |
| 500 Internal Server Error | Deletion failed | `{ "error": "Internal server error" }` |

## Error Handling
The API returns standard HTTP status codes:

| Status Code | Description          |
|-------------|------------------------|
| 200 OK     | Request succeeded    |
| 201 Created| Resource created     |
| 400 Bad Request | Missing or invalid request data |
| 401 Unauthorized | Invalid credentials |
| 404 Not Found | Resource not found  |
| 500 Internal Server Error | Server-side error |
