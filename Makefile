# =============================================================================
# Variables
# =============================================================================
COMPOSE := docker compose
COMPOSE_PROJECT := translate

# =============================================================================
# Help
# =============================================================================
.PHONY: help
help:
	@echo "Translate Front - Доступные команды:"
	@echo ""
	@echo "  Docker:"
	@echo "    make up          - Поднять контейнеры (фоновый режим)"
	@echo "    make up-build    - Поднять и собрать (с пересборкой)"
	@echo "    make down        - Остановить контейнеры"
	@echo "    make restart     - Перезапустить контейнеры"
	@echo "    make build       - Пересобрать образы"
	@echo "    make ps          - Показать статус контейнеров"
	@echo ""
	@echo "  Логи:"
	@echo "    make logs        - Логи всех сервисов"
	@echo "    make logs-be     - Логи backend"
	@echo "    make logs-fe     - Логи frontend"
	@echo "    make logs-db     - Логи PostgreSQL"
	@echo ""
	@echo "  База данных:"
	@echo "    make db-connect  - Подключиться к PostgreSQL"
	@echo ""
	@echo "  Разработка:"
	@echo "    make shell-be    - Shell в backend контейнере"
	@echo "    make shell-fe    - Shell в frontend контейнере"
	@echo ""
	@echo "  Тесты:"
	@echo "    make test        - Запустить тесты backend"
	@echo "    make lint        - Запустить линтер backend"
	@echo "    make lint-fe     - Запустить линтер frontend"
	@echo ""
	@echo "  Очистка:"
	@echo "    make clean       - Удалить контейнеры и volumes"
	@echo "    make prune       - Полная очистка Docker"

# =============================================================================
# Docker
# =============================================================================
.PHONY: up up-build down restart build ps
up:
	$(COMPOSE) up -d

up-build:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

build:
	$(COMPOSE) build --no-cache

ps:
	$(COMPOSE) ps

# =============================================================================
# Logs
# =============================================================================
.PHONY: logs logs-be logs-fe logs-db
logs:
	$(COMPOSE) logs -f

logs-be:
	$(COMPOSE) logs -f backend

logs-fe:
	$(COMPOSE) logs -f frontend

logs-db:
	$(COMPOSE) logs -f postgres

# =============================================================================
# Database
# =============================================================================
.PHONY: db-connect
db-connect:
	$(COMPOSE) exec postgres psql -U postgres -d translate

# =============================================================================
# Shell
# =============================================================================
.PHONY: shell-be shell-fe
shell-be:
	$(COMPOSE) exec backend sh

shell-fe:
	$(COMPOSE) exec frontend sh

# =============================================================================
# Tests & Linting
# =============================================================================
.PHONY: test lint lint-fe
test:
	$(COMPOSE) exec backend go test -v -race -coverprofile=coverage.out ./...

lint:
	$(COMPOSE) exec backend golangci-lint run ./... || echo "golangci-lint not installed"

lint-fe:
	$(COMPOSE) exec frontend npm run lint

# =============================================================================
# Cleanup
# =============================================================================
.PHONY: clean prune
clean:
	$(COMPOSE) down -v --remove-orphans

prune: clean
	$(COMPOSE) down -v --rmi local
	docker system prune -f --volumes