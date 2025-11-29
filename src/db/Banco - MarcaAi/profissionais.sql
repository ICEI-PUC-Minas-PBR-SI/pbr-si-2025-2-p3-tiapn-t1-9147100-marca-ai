USE marcaai_db;

DROP TABLE IF EXISTS profissional;

CREATE TABLE profissional (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barbearia INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,

  FOREIGN KEY (id_barbearia) REFERENCES barbearias(id)
);

SELECT * FROM profissional;








