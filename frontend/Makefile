default:
	@echo Please specify target name!
run:
	docker compose exec frontend_app npm start
up:
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
init:
	@make build
	@make up
	docker compose exec frontend_app npm install
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
	docker compose exec frontend_app ash
