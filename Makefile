start:
	@docker-compose up -d

stop:
	@docker-compose down

no-cache:
	@docker-compose build --no-cache

build:
	@docker-compose build
