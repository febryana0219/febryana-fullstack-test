# User API

## Register User
Endpoint : POST /api/users/register
Request Body :
```
{
  "email" : "admin@admin.com"
  "password" : "admin"
  "name" : "Admin"
}
```
Response (success) :
```
{
  "data": {
    "id": 1,
    "email": "admin@admin.com",
    "name": "Admin",
    "created_at": "2025-01-29T18:53:22.305Z",
    "updated_at": "2025-01-29T18:53:22.305Z"
  }
}
```
Response (failed) :
```
{
  "errors": "Validation Error",
  "details": [
    {
      "path": [
        "email"
      ],
      "message": "Invalid email"
    },
    {
      "path": [
        "email"
      ],
      "message": "Email is required"
    },
    {
      "path": [
        "name"
      ],
      "message": "String must contain at least 3 character(s)"
    },
    {
      "path": [
        "name"
      ],
      "message": "Name is required"
    },
    {
      "path": [
        "password"
      ],
      "message": "String must contain at least 3 character(s)"
    },
    {
      "path": [
        "password"
      ],
      "message": "Password is required"
    }
  ]
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email" : "admin@admin.com",
  "password" : "admin"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "email": "admin@admin.com",
    "name": "Admin",
    "token": "token",
    "refresh_token": "refresh_token",
    "created_at": "2025-01-28T16:05:28.677Z",
    "updated_at": "2025-01-29T18:45:43.924Z"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Validation Error",
  "details": [
    {
      "path": [
        "email"
      ],
      "message": "Invalid email"
    },
    {
      "path": [
        "email"
      ],
      "message": "Email is required"
    },
    {
      "path": [
        "password"
      ],
      "message": "String must contain at least 3 character(s)"
    },
    {
      "path": [
        "password"
      ],
      "message": "Password is required"
    }
  ]
}
```


## Get User

Endpoint : GET /api/users/me

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "email": "admin@admin.com",
    "name": "Admin",
    "created_at": "2025-01-28T16:05:28.677Z",
    "updated_at": "2025-01-29T18:56:06.268Z"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```


## Logout User

Endpoint : DELETE /api/users/me

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "message": "Logout successful"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```
