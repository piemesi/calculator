# calculator
Calculator App with actions' history on reactJS, mongodb (mongoose), express, node, webpack

### Запуск проекта без Docker

1. Clone this repo
2. `cd calculator` (root dir of the App)
3. `npm install` 
4. Скопируйте `etc/config.json.sample` в `etc/config.json`  (Если необходимо, поменяйте настройки)
5. `npm run server`
6. `npm run webpack-devserver`
7. Приложение должно стать доступным по http://localhost:8090 в браузере

### Запуск проекта c помощью Docker-compose

1. Необходимо установить docker (engine - ver. >16.0). Позволить запускать docker без `sudo`
2. Установить docker-compose (ver. >1.11.)
3. Склонировать repo
4. Желательно, установить права на папку проекта: `chmod 777 -R {APP_FOLDER}`, где {APP_FOLDER} - папка проекта. 
5. Зайти в **root dir проекта** {APP_FOLDER}.
6. Выполнить в консоли: `docker-compose up --build`
**6.a. При некоторых настройках, возможно "permission denied" при `npm run _somescript_` - контейнеры не запустяться. Можно сделать еще раз `chmod 777 -R {APP_FOLDER}` и повторить пункт 6.
7. После завершения проект должен быть доступен по (если указанные порты не были заняты):
* **Клиент**: `http://localhost:8090/`
* **Сервер**: `http://localhost:8080/` 
*(например, можно проверить рест запросом http://localhost:8080/calc-actions)*

### Архитектура проекта
* Клиентаская часть в папке client/ на основе flux-архитектуры. Entrypoint (`client/calc.js`) - и сам запуск клиентской части -
через webpack: `npm run webpack-devserver`
* Серверная часть располагается в папке server. Взаимодействие с бд MongoDB через утилиту mongoose. Используется модель - models/Action.js
Сам запуск сервера - app.js (поскольку ES6-> запуск выполнять через `babel-node server/app.js`). Но лучше через `npm run webpack-devserver`. А еще лучше - с помощью `docker-compose up --build`







