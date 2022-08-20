default:
	@echo Please specify target name!
up:
	docker compose up -d
init:
	cp ./src/.env.example ./src/.env
	@make up
	@make key-generate
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
	docker compose exec backend_app bash
key-generate:
	docker compose exec backend_app php artisan key:generate
migrate:
	docker compose exec backend_app php artisan migrate
fresh:
	docker compose exec backend_app php artisan migrate:fresh
fresh-seed:
	docker compose exec backend_app php artisan migrate:fresh --seed
dump-autoload:
	docker compose exec backend_app composer dump-autoload