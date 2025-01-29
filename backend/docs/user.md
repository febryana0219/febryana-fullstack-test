# User API

## Register User
Endpoint : POST /api/users
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
  "data" : {
    "id" : "1"
    "email" : "admin@admin.com"
    "name" : "Admin"
  }
}
```
Response (failed) :
```
{
  "errors" : "Email and password must be filled!"
}
```

## Login User


## Get User

## Update User

## Logout