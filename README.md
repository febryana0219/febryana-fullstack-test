# Setup Project

## Backend
create .env file
```
DATABASE_URL="mysql://root:@localhost:3306/inventory_db"
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

Lalu jalankan perintah berikut:
```
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run dev

```

## Frontend
create .env file
```
VITE_BASE_URL=/
```

Lalu jalankan perintah berikut:

```
npm install

npm run dev
```
