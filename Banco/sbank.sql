create database sbank;
use sbank;

drop database sbank;

create table login(
	id int unique auto_increment primary key,
    nome varchar(255) not null,
    email varchar(255) not null
);

insert into login (nome, email, telefone, senha) 
Values ("Bigodinho", "Bigodinho@gmail.com", "(51) 991695144", "12345678");

select * from login;