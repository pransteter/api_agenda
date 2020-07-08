.PHONY: up
up:
	docker-compose up -d

.PHONY: test
test:
	docker exec api_agenda_app npm run test

.PHONY: down
down:
	docker-compose down