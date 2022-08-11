default:
	@echo Please specify target name!
up:
	docker compose up -d --build
build:
	docker compose build --no-cache --force-rm
init:
	@make build
	@make up
	@make composer-install
	docker compose exec app cp .env.example .env
	docker compose exec app php artisan key:generate
	@make fresh-seed
remake:
	@make destroy
	@make init
stop:
	docker compose stop
down:
	docker compose down
restart:
	@make down
	@make up
rebuild:
	@make down
	@make build
	@make up
destroy:
	docker compose down --rmi all --volumes
destroy-volumes:
	docker compose down --volumes
ps:
	docker compose ps
logs:
	docker compose logs --follow
app:
	docker compose exec app bash

migrate:
	docker compose exec app php artisan migrate
fresh:
	docker compose exec app php artisan migrate:fresh
fresh-seed:
	docker compose exec app php artisan migrate:fresh --seed
composer-install:
	docker compose exec app composer install
dump-autoload:
	docker compose exec app composer dump-autoload
test:
	docker compose exec app php artisan test