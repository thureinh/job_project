default:
	@echo Please specify target name!
run:
	docker compose exec app npm run dev
up:
	docker compose up -d
build:
	docker compose build --no-cache --force-rm
init:
	@make build
	@make up
	docker compose exec app npm ci
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
	docker compose exec app ash
lint:
	docker compose exec app npm run lint
lint-fix:
	@make lint
	docker compose exec app npm run lintfix
test:
	docker compose exec app npm run test
