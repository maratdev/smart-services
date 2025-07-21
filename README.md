# Рекомендуемые системные требования

- Docker Compose version v2.38.2
- Docker version 28.3.2, build 578ccf6
- Node.js v22.17.1
- Ubuntu 24.04.2 LTS

**Порты по умолчанию:**
- backend: http://localhost:3000
- frontend: http://localhost:8080

---

# Подготовка переменных окружения

Перед запуском переименуйте файл `.env.example` в `.env` в нужной папке (например, backend или frontend) и заполните переменные:

```sh
cp .env.example в .env
cp frontend/.env.example в frontend/.env
```
---

# Запуск backend в production

1. **Соберите контейнер и запустите backend:**
   ```sh
   npm run start:prod
   ```

2. **Выполните миграции (production):**
   ```sh
   npm run migration:run:prod
   ```

3. **Вставьте тестовые данные (seed, production):**
   ```sh
   npm run seed:prod
   ```

---

- Для разработки используйте аналогичные команды с `:dev`