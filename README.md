# Mini Lead Tracker

CRM-додаток для управління лідами з коментарями.

**Stack:** NestJS · Prisma · PostgreSQL (Neon) · Next.js · TailwindCSS · Docker

---

## Запуск локально

### Backend

```bash
cd apps/api
cp .env.example .env  
npm install
npx prisma migrate deploy
npm run start:dev
```

API буде доступне на `http://localhost:3001`

### Frontend

```bash
cd apps/web
cp .env.example .env.local 
npm install
npm run dev
```

Додаток буде доступний на `http://localhost:3000`

---

## Запуск через Docker

```bash
cp apps/api/.env.example apps/api/.env   # заповни DATABASE_URL
docker compose up --build
```

| Сервіс   | URL                    |
|----------|------------------------|
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:3001  |

---

## Змінні оточення

### Backend — `apps/api/.env`

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

| Змінна         | Опис                                              |
|----------------|---------------------------------------------------|
| `NODE_ENV`     | Середовище: `development` / `production` / `test` |
| `PORT`         | Порт API-сервера (за замовчуванням `3001`)         |
| `DATABASE_URL` | Рядок підключення до PostgreSQL                   |

### Frontend — `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

| Змінна                | Опис                              |
|-----------------------|-----------------------------------|
| `NEXT_PUBLIC_API_URL` | Базова URL для запитів до Backend |

---

## API — приклади запитів

### Отримати список лідів

```http
GET /api/leads
```

Query-параметри (опціонально): `page`, `limit`, `status`, `search`

```bash
curl http://localhost:3001/api/leads
```

### Створити ліда

```http
POST /api/leads
Content-Type: application/json
```

```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "company": "Acme", "status": "NEW"}'
```

### Отримати ліда за ID

```http
GET /api/leads/:id
```

```bash
curl http://localhost:3001/api/leads/<uuid>
```

### Оновити ліда

```http
PATCH /api/leads/:id
Content-Type: application/json
```

```bash
curl -X PATCH http://localhost:3001/api/leads/<uuid> \
  -H "Content-Type: application/json" \
  -d '{"status": "CONTACTED"}'
```

### Видалити ліда

```http
DELETE /api/leads/:id
```

```bash
curl -X DELETE http://localhost:3001/api/leads/<uuid>
```

### Отримати коментарі ліда

```http
GET /api/leads/:leadId/comments
```

```bash
curl http://localhost:3001/api/leads/<uuid>/comments
```

### Додати коментар

```http
POST /api/leads/:leadId/comments
Content-Type: application/json
```

```bash
curl -X POST http://localhost:3001/api/leads/<uuid>/comments \
  -H "Content-Type: application/json" \
  -d '{"text": "Зателефонував, чекаємо відповіді"}'
```

### Статуси лідів

| Статус        | Опис              |
|---------------|-------------------|
| `NEW`         | Новий             |
| `CONTACTED`   | Зв'язались        |
| `IN_PROGRESS` | В роботі          |
| `WON`         | Виграно           |
| `LOST`        | Програно          |

---

## Production build

### Без Docker

**Backend:**

```bash
cd apps/api
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd apps/web
npm run build
npm start
```

### Через Docker

```bash
docker compose up --build
```

Обидва Dockerfile вже налаштовані на production-режим (`npm run build` + `npm run start`).
