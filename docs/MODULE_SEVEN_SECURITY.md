# Module 7 - Security Guide

## Overview

This document describes the security layer implementation for the Travlr Getaways admin system. The implementation adds JWT-based authentication to protect administrative endpoints while keeping public endpoints accessible.

## Admin Credentials

**Email:** `admin@example.com`  
**Password:** `P@ssw0rd`

## Backend Implementation

### New Files Created

1. **`app_api/models/user.js`** - User Mongoose model with email, name, and hashed password
2. **`app_api/controllers/auth.js`** - Authentication controller with login endpoint
3. **`app_api/middleware/auth.js`** - JWT authentication middleware
4. **`app_api/models/seed-user.js`** - Script to seed admin user

### Modified Files

1. **`app_api/routes/index.js`** - Added `/api/login` route and applied auth middleware to POST/PUT/DELETE
2. **`app_server/models/db.js`** - Added User model import
3. **`package.json`** - Added `jsonwebtoken` and `bcrypt` dependencies

### API Endpoints

#### Public Endpoints (No Authentication Required)

- `GET /api/trips` - Get all trips
- `GET /api/trips/:tripCode` - Get single trip

#### Protected Endpoints (Authentication Required)

- `POST /api/trips` - Create new trip
- `PUT /api/trips/:tripCode` - Update trip
- `DELETE /api/trips/:tripCode` - Delete trip

#### Authentication Endpoint

- `POST /api/login` - Login and receive JWT token
  - Request body: `{ "email": "admin@example.com", "password": "P@ssw0rd" }`
  - Response: `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`

## Frontend Implementation

### New Files Created

1. **`admin/src/app/services/auth.service.ts`** - Authentication service with login/logout/token management
2. **`admin/src/app/auth/login.component.ts`** - Login component
3. **`admin/src/app/auth/login.component.html`** - Login form template
4. **`admin/src/app/auth/login.component.css`** - Login component styles
5. **`admin/src/app/auth/auth.guard.ts`** - Route guard for protecting admin routes

### Modified Files

1. **`admin/src/app/services/trip-data.service.ts`** - Added JWT token to headers for POST/PUT/DELETE requests
2. **`admin/src/app/app-routing.module.ts`** - Added login route and AuthGuard to protect admin routes
3. **`admin/src/app/app.module.ts`** - Added LoginComponent to declarations
4. **`admin/src/app/app.component.ts`** - Added logout functionality
5. **`admin/src/app/app.component.html`** - Added logout button to navbar

### Protected Routes

All admin routes require authentication:

- `/trips` - Trip list (protected)
- `/trips/add` - Add trip form (protected)
- `/trips/:code/edit` - Edit trip form (protected)

### Public Routes

- `/login` - Login page (public)

## Setup Instructions

### 1. Seed Admin User

Before testing, you need to create the admin user in the database:

```bash
node app_api/models/seed-user.js
```

Or use the npm script:

```bash
npm run seed:user
```

### 2. Start Backend Server

```bash
npm start
```

The Express server will run on `http://localhost:3000`

### 3. Start Angular Admin App

```bash
cd admin
npm start
```

The Angular app will run on `http://localhost:4200`

## Testing Guide

### Testing in Angular SPA

1. **Access Protected Route Without Login:**

   - Navigate to `http://localhost:4200/trips`
   - You should be redirected to `/login`
2. **Login:**

   - Enter email: `admin@example.com`
   - Enter password: `P@ssw0rd`
   - Click "Login"
   - You should be redirected to `/trips`
3. **Access Protected Routes After Login:**

   - Navigate to `/trips/add` - Should work
   - Navigate to `/trips/:code/edit` - Should work
   - All CRUD operations should work
4. **Logout:**

   - Click "Logout" in the navbar
   - You should be redirected to `/login`
   - Try accessing `/trips` again - Should redirect to login

### Testing with Postman

#### 1. Test Login Endpoint

**Request:**

```
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "P@ssw0rd"
}
```

**Expected Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Test Login with Invalid Credentials

**Request:**

```
POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "wrongpassword"
}
```

**Expected Response (401 Unauthorized):**

```json
{
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

#### 3. Test Protected Endpoint Without Token

**Request:**

```
POST http://localhost:3000/api/trips
Content-Type: application/json

{
  "code": "TEST",
  "name": "Test Trip",
  ...
}
```

**Expected Response (401 Unauthorized):**

```json
{
  "error": "Unauthorized",
  "message": "No token provided"
}
```

#### 4. Test Protected Endpoint With Valid Token

1. First, get a token from the login endpoint (step 1)
2. Copy the token value

**Request:**

```
POST http://localhost:3000/api/trips
Content-Type: application/json
Authorization: Bearer <your-token-here>

{
  "code": "TEST",
  "name": "Test Trip",
  "length": 5,
  "start": "2025-06-01",
  "resort": "Test Resort",
  "perPerson": 1000,
  "image": "test.jpg",
  "description": "Test description"
}
```

**Expected Response (201 Created):**

```json
{
  "_id": "...",
  "code": "TEST",
  "name": "Test Trip",
  ...
}
```

#### 5. Test Public Endpoint (No Token Required)

**Request:**

```
GET http://localhost:3000/api/trips
```

**Expected Response (200 OK):**

```json
[
  {
    "_id": "...",
    "code": "...",
    "name": "...",
    ...
  }
]
```

#### 6. Test Protected DELETE Endpoint

**Request:**

```
DELETE http://localhost:3000/api/trips/TEST
Authorization: Bearer <your-token-here>
```

**Expected Response (204 No Content)** - If trip exists and token is valid

**Expected Response (401 Unauthorized)** - If no token provided

## Security Model Summary

The security implementation follows a standard JWT-based authentication pattern:

1. **User Authentication:** Admin users log in via `/api/login` with email and password
2. **Token Generation:** On successful login, the server generates a JWT token with user information
3. **Token Storage:** The Angular app stores the token in `localStorage`
4. **Token Transmission:** For protected endpoints (POST/PUT/DELETE), the Angular app includes the token in the `Authorization: Bearer <token>` header
5. **Token Verification:** The Express middleware verifies the token on each protected request
6. **Route Protection:** Angular route guards prevent access to admin routes without authentication

### Key Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 1 hour
- Tokens are verified on every protected request
- Public GET endpoints remain accessible for the customer-facing site
- Clear error messages for unauthorized access

## Troubleshooting

### Admin User Not Created

If the seed script doesn't create the user:

1. Ensure MongoDB is running
2. Check database connection in `app_server/models/db.js`
3. Run seed script manually: `node app_api/models/seed-user.js`

### Token Not Working

1. Check that token is being stored in localStorage
2. Verify token is included in request headers (check browser DevTools Network tab)
3. Ensure token hasn't expired (tokens expire after 1 hour)
4. Try logging in again to get a new token

### CORS Issues

If you encounter CORS errors:

1. Verify CORS is enabled in `app.js` for `http://localhost:4200`
2. Check that proxy is configured in `admin/proxy.conf.json`

## Files Changed Summary

### Backend

- `app_api/models/user.js` (NEW)
- `app_api/controllers/auth.js` (NEW)
- `app_api/middleware/auth.js` (NEW)
- `app_api/models/seed-user.js` (NEW)
- `app_api/routes/index.js` (MODIFIED)
- `app_server/models/db.js` (MODIFIED)
- `package.json` (MODIFIED - added dependencies)

### Frontend

- `admin/src/app/services/auth.service.ts` (NEW)
- `admin/src/app/auth/login.component.ts` (NEW)
- `admin/src/app/auth/login.component.html` (NEW)
- `admin/src/app/auth/login.component.css` (NEW)
- `admin/src/app/auth/auth.guard.ts` (NEW)
- `admin/src/app/services/trip-data.service.ts` (MODIFIED)
- `admin/src/app/app-routing.module.ts` (MODIFIED)
- `admin/src/app/app.module.ts` (MODIFIED)
- `admin/src/app/app.component.ts` (MODIFIED)
- `admin/src/app/app.component.html` (MODIFIED)
