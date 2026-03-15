# Docker Workflow

## Быстрый старт

```bash
# Поднять контейнеры с билдом
make up-build

# Проверить статус
make ps

# Логи
make logs        # все сервисы
make logs-backend
make logs-frontend
make logs-db
```

## Команды

| Команда | Описание |
|---------|----------|
| `make up` | Поднять контейнеры (фоновый режим) |
| `make up-build` | Поднять с билдом |
| `make down` | Остановить |
| `make restart` | Перезапустить |
| `make build` | Пересобрать |
| `make ps` | Статус контейнеров |
| `make db-connect` | Подключиться к PostgreSQL |
| `make backend-shell` | Зайти в backend контейнер |
| `make clean` | Удалить контейнеры и volumes |

## URLs

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8080
- **PostgreSQL**: localhost:5432

## Тестирование API

```bash
# Авторизация (signin)
curl -X POST http://localhost:8080/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@translate.local","password":"admin123"}'

# Регистрация (signup)
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password123","name":"User"}'
```

## Устранение проблем

### Порт занят

```bash
# Освободить порт 8080
fuser -k 8080/tcp
```

### Контейнер не в сети

Если backend не может подключиться к postgres (network is unreachable):
```bash
# Удалить контейнер и пересоздать
docker compose down -v
docker compose up -d
```

### Очистка всех сетей

```bash
docker network prune -f
```

## Структура сервисов

- **postgres** — PostgreSQL 16 (данные в volume)
- **backend** — Go + Gin (порт 8080)
- **frontend** — Nginx (порт 80)