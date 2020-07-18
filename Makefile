.PHONY: help build up test down

help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-15s[0m %s\n", $$1, $$2}'

build: ## Build docker environment
	docker-compose build

up: ## Run docker environment (Second step)
	docker-compose up

test: ## Run all tests
	docker exec api_agenda_app npm run test

down: ## Turn off the docker environment
	docker-compose down