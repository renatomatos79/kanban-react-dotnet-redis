# Precisamos criar uma rede: API e o REDIS

```sh
docker network create --driver bridge backend-bridge-network
```

# Inicializacao do REDIS com opcao para delete de um possivel existente container com mesmo nome

```sh
docker rm redisserver
docker run --name redisserver --restart unless-stopped -d --network=backend-bridge-network -p 6379:6379 redis
```

# Build da imagem docker e execucao local do container

```sh
docker build -t kanban-api:1.0.0 .
docker run -d --name kanban-api-backend --network=backend-bridge-network -e LOGIN_API_USERNAME=%APP_USERNAME% -e LOGIN_API_PASSWORD=%APP_PASSWORD% -e JWT_AUDIENCE=%APP_JWT_AUDIENCE% -e JWT_ISSUER=%APP_JWT_ISSUER% -e JWT_SECRET_KEY=%APP_JWT_SECRET_KEY% --restart unless-stopped -p 8086:8080 kanban-api:1.0.0
```

# NAo esqueCa de verificar se as variAveis foram devidamente carregadas
```sh
docker container logs kanban-api-backend
```

# Teste do container
Cole a URL em seu browser: http://localhost:8086/swagger
Na rota de login informe as credenciais
{
  "login": "Informar o mesmo conteudo salvo na sua variavel ambiente APP_USERNAME",
  "senha": "Informar o mesmo conteudo salvo na sua variavel ambiente APP_PASSWORD"
}

```sh
Exemplo:
{
  "login": "renato-matos",
  "senha": "#123456@"
}
```

# Building and Deploy a Docker Image login-backend

```sh
docker login
docker build -t kanban-api:1.0.0 .
docker tag kanban-api:1.0.0 renatomatos79/kanban-api:1.0.0
docker push renatomatos79/kanban-api:1.0.0
docker run -d --name kanban-api-backend --network=backend-bridge-network -e LOGIN_API_USERNAME=%APP_USERNAME% -e LOGIN_API_PASSWORD=%APP_PASSWORD% -e JWT_AUDIENCE=%APP_JWT_AUDIENCE% -e JWT_ISSUER=%APP_JWT_ISSUER% -e JWT_SECRET_KEY=%APP_JWT_SECRET_KEY% --restart unless-stopped -p 8086:8080 renatomatos79/kanban-api:1.0.0
docker container logs kanban-api-backend
```

