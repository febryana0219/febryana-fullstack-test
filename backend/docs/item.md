# Item Api

## Create Item
Endpoint : POST /api/items/create
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
    "id": 7,
    "name": "Indomie Goreng",
    "qty": 100,
    "price": "4000",
    "unit": "pcs",
    "category_id": 2,
    "category_name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-30T03:23:47.651Z",
    "updated_by": null,
    "updated_by_name": "",
    "updated_at": "2025-01-30T03:23:47.651Z"
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

## Get All Item
Endpoint : POST /api/item
- X-API-TOKEN : token

Request Body :
```
```
Response (success) :
```
{
  "data": {
    "id": 5,
    "name": "Indomie Goreng",
    "qty": 100,
    "price": "4000",
    "unit": "Pcs",
    "category_id": 2,
    "category_name": "Makanan",
    "created_by": 1,
    "created_by_name": "Admin",
    "created_at": "2025-01-30T03:19:58.767Z",
    "updated_by": null,
    "updated_by_name": "",
    "updated_at": "2025-01-30T03:19:58.767Z"
  }
}
```