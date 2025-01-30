# Category Api

## Create Category

Endpoint : POST /api/categories/create
- X-API-TOKEN : token

Request Body :
```
{
  "name": "Makanan"
}
```
Response (success) :
```
{
  "data": {
    "id": 1,
    "name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-29T19:03:53.105Z",
    "updated_by": null,
    "updated_by_name": "",
    "updated_at": "2025-01-29T19:03:53.105Z"
  }
}
```


Response (failed token tidak valid) :
```
{
  "errors" : "Unauthorized, ..."
}
```

Response (failed) :
```
{
  "errors": "Validation Error",
  "details": [
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
    }
  ]
}
```

## Get All Category
Endpoint : POST /api/categories
- X-API-TOKEN : token

Request Body :
```
```
Response (success) :
```
{
  "data": {
    "id": 1,
    "name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-29T19:03:53.105Z",
    "updated_by": null,
    "updated_by_name": "",
    "updated_at": "2025-01-29T19:03:53.105Z"
  }
}
```

## Get Category By Id
Endpoint : POST /api/categories/1
- X-API-TOKEN : token

Request Body :
```
```
Response (success) :
```
{
  "data": {
    "id": 1,
    "name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-29T19:03:53.105Z",
    "updated_by": null,
    "updated_by_name": "",
    "updated_at": "2025-01-29T19:03:53.105Z"
  }
}
```

Response (failed)
```
{
  "errors": "Category not found!"
}
```

## Update Category
Endpoint : POST /api/categories/1
- X-API-TOKEN : token

Request Body :
```
```
Response (success) :
```
{
  "data": {
    "id": 1,
    "name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-29T19:03:53.105Z",
    "updated_by": 1,
    "updated_by_name": "Admin",
    "updated_at": "2025-01-29T19:04:53.105Z"
  }
}
```

Response (failed)
```
{
  "errors": "Category not found!"
}
```

## Delete Category
Endpoint : POST /api/categories/1
- X-API-TOKEN : token

Request Body :
```
```
Response (success) :
```
{
  "data": "Category removed successfully"
}
```

Response (failed)
```

{
  "data": "Category removed successfully"
}
```