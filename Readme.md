# Дипломный проект

Сборка образа производится командой:
```sh
bash bin/deploy.sh
```

Для запуска приложения требуется установленный `Docker` и `docker-compose`, поддерживающий конфигурационный файл версии `3.3` и выше.

Перед первым запуском проекта необходимо создать файлы `.env` и `.db.env` в корне проекта по примерам `.env.example` и `.db-env.example` соответственно.

Если приложение запускается в `docker swarm`, то необходимо в `docker-compose.yml` раскоментировать секции, относящиеся к `docker secrets`, а в env-файлах вместо переменных `MYSQL_PASSWORD` и `MYSQL_ROOT_PASSWORD` использовать переменные `MYSQL_PASSWORD_FILE` и `MYSQL_ROOT_PASSWORD_FILE` соответственно.

Первичный запуск проекта:
```sh
docker volume create --name=daniil_database
docker network create daniil-project-net
docker-compose up
```

Все последующие запуски:
```sh
docker-compose up
```

При первом запуске необходимо выполнить мирграции. Для этого необходимо зайти в контейнер:
```sh
docker exec -it daniil-api sh
```

И выполнить команду:
```sh
npm run migrate:latest
```

Сервер по-умолчанию доступен по адресу `api.daniil.test`. Необходимо либо отредактировать этот адрес либо, при запуске на локальной машине, прописать его в `/etc/hosts`, назначив IP машины.