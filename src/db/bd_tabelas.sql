CREATE TABLE `servicos` (
  `id_servico` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id_servico`)
) 
CREATE TABLE `agenda` (
  `id_agenda` int NOT NULL AUTO_INCREMENT,
  `data_agenda` date NOT NULL,
  `hora` time NOT NULL,
  `cnpj_barbearia` varchar(14) DEFAULT NULL,
  `cpf_cliente` varchar(11) DEFAULT NULL,
  `cpf_profissionall` varchar(11) DEFAULT NULL,
  `id_servico` int DEFAULT NULL,
  PRIMARY KEY (`id_agenda`)
)

CREATE TABLE `barbearia` (
  `cnpj_barbearia` varchar(14) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `celular` varchar(17) NOT NULL,
  `uf` char(2) NOT NULL,
  `cidade` varchar(60) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `bairro` varchar(60) NOT NULL,
  `rua` varchar(60) NOT NULL,
  `numero` varchar(5) NOT NULL,
  PRIMARY KEY (`cnpj_barbearia`),
  UNIQUE KEY `email` (`email`)
) 
CREATE TABLE `cadastro_barbearia` (
  `id_barbearia` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
  PRIMARY KEY (`id_barbearia`),
  UNIQUE KEY `id_barbearia` (`id_barbearia`),
  UNIQUE KEY `nome` (`nome`),
  UNIQUE KEY `email` (`email`)
)
CREATE TABLE `cliente` (
  `cpf_cliente` varchar(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`cpf_cliente`),
  UNIQUE KEY `email` (`email`)
) 
CREATE TABLE `profissional` (
  `cpf_profissional` varchar(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `celular` varchar(17) NOT NULL,
  PRIMARY KEY (`cpf_profissional`),
  UNIQUE KEY `email` (`email`)
) 
CREATE TABLE `servicos` (
  `id_servico` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id_servico`)
) 