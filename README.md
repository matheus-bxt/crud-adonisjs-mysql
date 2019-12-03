# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## System Requirements

The only dependencies of the framework are Node.js, npm and mysql.

### Setup

command line:

```js
npm i -g @adonisjs/cli
```

#### Script MySQL

```js
create database av2hospital
```

##### Migrations

command line: 

```js
adonis migration:run
```

###### Start Server

command line: 

```js
adonis serve --dev
```

###### Open Browser

http://127.0.0.1:3333/