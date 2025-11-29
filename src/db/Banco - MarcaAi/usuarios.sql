USE marcaai_db;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255),
  tipo VARCHAR(20)
);

SELECT * FROM usuarios;
