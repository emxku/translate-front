# Backend Stack

## Frontend API Requirements

### Auth API
- `POST /auth/signin` — вход
- `POST /auth/signup` — регистрация
- `POST /auth/refresh` — обновление токенов

### Translations API
- `GET /translations` — список переводов
- `POST /translations` — создать перевод
- `PATCH /translations/:id` — редактировать (title)
- `GET /translations/:id` — детали перевода

### Chapters API
- `GET /translations/:id/chapters` — список глав перевода
- `POST /translations/:id/chapters` — создать главу
- `PATCH /chapters/:id` — редактировать главу
- `DELETE /chapters/:id` — удалить главу
- `PUT /chapters/reorder` — изменить порядок глав

### Collaborators API
- `GET /translations/:id/members` — участники перевода
- `POST /translations/:id/members` — добавить участника
- `DELETE /translations/:id/members/:userId` — удалить участника

### Notes API
- `GET /notes`
- `POST /notes`
- `PATCH /notes/:id`
- `DELETE /notes/:id`

### Profile API
- `GET /profile`
- `PATCH /profile`

---

## Recommended Go Stack

| Компонент | Вариант |
|-----------|---------|
| HTTP-фреймворк | Gin или Fiber |
| ORM / SQL | GORM или sqlx |
| Миграции | golang-migrate |
| Валидация | go-playground/validator |
| Config | viper |
| Auth | JWT (golang-jwt/jwt) |
| База данных | PostgreSQL |

## Data Models

### User
- id, email, password_hash, name, bio, avatar, created_at, updated_at

### Translation
- id, user_id, title, description, current_chapter, created_at, updated_at

### Chapter
- id, translation_id, title, order, original_text, translated_text, status
- status: "in_progress" | "translated" | "reviewed"

### Note
- id, user_id, content, created_at, updated_at
