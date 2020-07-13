.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up

.PHONY: test
test:
	docker exec api_agenda_app npm run test

.PHONY: down
down:
	docker-compose down