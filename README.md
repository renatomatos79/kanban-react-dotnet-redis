# Sobre o repositorio
Este projeto contem as seguintes pastas
- ## FRONT: App kanban feita em React@18
Clique no GIF abaixo para visualizar o funcionamento da app!
![Kanban](https://github.com/user-attachments/assets/e9fec469-15cf-4cb5-bd35-a4ec85f48981)


- ## BACK: Api para gestao do Kanban usando .NET Core 8 / Redis
Clique no GIF abaixo para visualizar o funcionamento do backend!
![API-Kanban](https://github.com/user-attachments/assets/32349a8d-e4a1-4a3b-8dce-bbf88cc3ebd0)

```sh
(POST)      http://0.0.0.0:8086/login/

(GET)       http://0.0.0.0:8086/cards/
(POST)      http://0.0.0.0:8086/cards/
(PUT)       http://0.0.0.0:8086/cards/{id}
(DELETE)    http://0.0.0.0:8086/cards/{id}
```

# Antes de executar o docker compose
O projeto frontend esta sendo publicado em um container docker
usando _nginx:alpine_. Portanto, e preciso primeiro realizar o build
da aplicacao frontend para criacao da pasta _dist_ e com isso 
sera entao possivel inicializar o _docker-compose_

# Build rapido do frontend
- Acesse a pasta FRONT
- Inicialize as variaveis do arquivo _.env.docker_
- Instale os pacotes
- Build a aplicacao

```sh
cd FRONT
npm i
npm run build:dist
```
![image](https://github.com/user-attachments/assets/355e8c1b-a354-4bd2-b898-a24d768fb290)

# Inicializando frontend / backend / redis
```sh
docker-compose up -d --build
```
![image](https://github.com/user-attachments/assets/dabf6813-bcb3-4865-9abc-fe762025d0e2)

=> Containers em execução
![image](https://github.com/user-attachments/assets/58ebd405-a047-4de9-b027-c94cb8b5892e)

# Atenção
Caso não pretenda construir as imagens localmente, como alternativa, use o conteúdo abaixo em seu docker-compose.yml file
```
version: '3.8'

services:
  frontend:
    image: renatomatos79/kanban-app-front:1.0.0
    container_name: kanban-app-front
    ports:
      - "8085:80"
    depends_on:
      - backend

  backend:
    image: renatomatos79/kanban-api:1.0.0
    container_name: kanban-api-backend
    ports:
      - "8086:8080"
    environment:
      - LOGIN_API_USERNAME=${APP_USERNAME}
      - LOGIN_API_PASSWORD=${APP_PASSWORD}
      - JWT_AUDIENCE=${APP_JWT_AUDIENCE}
      - JWT_ISSUER=${APP_JWT_ISSUER}
      - JWT_SECRET_KEY=${APP_JWT_SECRET_KEY}
      - REDIS_HOST=redisserver
      - REDIS_PORT=6379
    depends_on:
      - redisserver
    networks:
      - backend-bridge-network
    restart: unless-stopped

  redisserver:
    image: redis:latest
    container_name: redisserver
    ports:
      - "6379:6379"
    networks:
      - backend-bridge-network
    restart: unless-stopped

networks:
  backend-bridge-network:
    driver: bridge
```

Então execute:
```
docker-compose up -d
```
![image](https://github.com/user-attachments/assets/a6884d4c-43c0-44e7-aa3a-7fa1fb1198f4)



# Links Uteis
- https://github.com/renatomatos79/kanban-react-dotnet-redis/blob/main/FRONT/README.md
- https://github.com/renatomatos79/kanban-react-dotnet-redis/blob/main/BACK/README.md



