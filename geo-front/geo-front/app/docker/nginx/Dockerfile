FROM node:lts-alpine

ADD ./default.conf /etc/nginx/conf.d/default.conf

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY ./package*.json ./

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /geo-front

RUN ls -a
# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# собираем приложение для production с минификацией
RUN npm run build

EXPOSE 80

CMD [ "http-server", "dist" ]

