## Arquivo .sql

--- Cadastro Cliente
CREATE TABLE cliente (
cpf_cliente VARCHAR (11) PRIMARY KEY,
nome VARCHAR (100) NOT NULL,
senha VARCHAR (255) NOT NULL,
email VARCHAR (150) UNIQUE NOT NULL,
celular VARCHAR (20) NOT NULL
); 

--- Cadastro Barbaria
CREATE TABLE cadastro_barbearia(
id_barbearia SERIAL PRIMARY KEY,
nome VARCHAR (100) UNIQUE NOT NULL,
email VARCHAR (150) UNIQUE NOT NULL,
senha VARCHAR (255) NOT NULL,
cnpj VARCHAR (14) NOT NULL
);