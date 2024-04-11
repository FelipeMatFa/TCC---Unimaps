# Executando a API

### Primeiramente após fazer o git clone

* Baixar no gitbash os recursos com o comando abaixo

    ```
    npm i express nodemon mysql2 dotenv cors
    ```

* Dentro do arquivo package.json colocar este script

    ```
    {
    "name": "sbank",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "nodemon src/server.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "mysql2": "^3.9.4",
        "nodemon": "^3.1.0"
    }
    }
    ```

### Criar o arquivo .env

* Coloque o código abaixo dentro do arquivo .env

    ```
    # DEFINIÇÃO DA PORTA DO SERVIDOR EXPRESS
    PORT =

    # VARIÁVEIS DE CONEXÃO COM BANCO
    DB_HOST = 
    DB_USER =
    DB_PASSWORD =
    DB_DATABASE =
    ```

### Crie seu banco de dados

* No MySql Workbrench crie um banco de dados como o código abaixo

    ```
    create database sbank;
    use sbank;
    
    drop database sbank;
    
    create table login(
        id int unique auto_increment primary key,
        nome varchar(255) not null,
        email varchar(255) not null,
        telefone varchar(14),
        senha varchar(255) not null
    );
    
    insert into login (nome, email, telefone, senha) 
    Values ("Bigodinho", "Bigodinho@gmail.com", "(51) 991695144", "12345678");
    
    select * from login;
    ```

### Insomnia

* Crie um metodo POST com o seguinte link
    
    ```
    http://localhost:3003/api/store/task
    ```

* E dentro desse metodo vá em body e troque por json e escreva dentro dele o seguinte código para caso você queira testar sem o seu site

    ```
    {
        "nome":"Felipe",
        "email": "felipe@gmail.com",
        "telefone":"99999-9999",
        "senha":"19087654"
    }
    ```

### Finalizando

* Agora é só testar no gitBash com o comando abaixo:

    ```
    npm start
    ```