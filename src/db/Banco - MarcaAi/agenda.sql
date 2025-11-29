USE marcaai_db;

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

SELECT * FROM agenda;
