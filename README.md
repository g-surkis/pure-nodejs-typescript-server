### install knex globally

```
npm install knex -g

```

switch to project folder

### install dependencies

```
npm install 

```

### create DB container

```
docker-compose up

```

### migrate db

```
npm run pg:migrate

```

### start server

```
npm start

```

open new terminal
switch to project folder

### cUrl for creating user
```
curl --location --request POST 'http://localhost:8000/api/user/create' \
--header 'Accept-Encoding: utf-8' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/json' \
--form 'name="First Name"' \
--form 'file=@"./cat.jpg"' \
--form 'surname="Surname"' \
--form 'email="my@email.com"'
```

### cUrl for extract user
```
curl --location --request GET 'http://localhost:8000/api/user?id={id of created user}'
```

### cUrl for extract image
```
curl --location --request GET 'http://localhost:8000/api/user/image?name={thumbnail name from previous result}'
```
 