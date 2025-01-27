# Sobre o repositorio
Este projeto contem as seguintes pastas
- ## FRONT: App kanban feita em React@18
![Kanban](https://github.com/user-attachments/assets/e9fec469-15cf-4cb5-bd35-a4ec85f48981)


- ## BACK: Api para gestao do Kanban usando .NET Core 8 / Redis
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

# Links Uteis
https://github.com/renatomatos79/kanban-react-dotnet-redis/blob/main/FRONT/README.md
https://github.com/renatomatos79/kanban-react-dotnet-redis/blob/main/BACK/README.md



