default:
	@echo Please specify target name!
up:
	docker compose --project-name bus-ticket up -d --build
init:
	@make up
	@make composer-install
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
app:
	docker compose exec app bash
migrate:
	docker compose exec app php artisan migrate
fresh:
	docker compose exec app php artisan migrate:fresh
fresh-seed:
	docker compose exec app php artisan migrate:fresh --seed
composer-install:
	ifeq (, $(shell which composer))
	$(error "No composer, Please install composer")
	endif
	composer install
dump-autoload:
	docker compose exec app composer dump-autoload