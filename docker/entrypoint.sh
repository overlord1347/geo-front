#!/bin/bash
set -e

# Проверка, что контейнер frontend-docker-app доступен
echo "Проверка, что контейнер frontend-docker-app доступен..."
until curl http://frontend-docker-app:80; do
  >&2 echo "frontend-docker-app недоступен - ожидание"
  sleep 1
done

# Запуск Nginx
echo "Запуск Nginx..."
exec nginx -g "daemon off;"
