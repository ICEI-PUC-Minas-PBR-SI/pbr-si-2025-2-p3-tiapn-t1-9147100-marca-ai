USE marcaai_db;

CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_barbearia INT NOT NULL,
  id_cliente INT NOT NULL,
  id_servico INT NOT NULL,
  id_profissional INT,
  data_agenda DATE NOT NULL,
  hora TIME NOT NULL,
  status VARCHAR(30) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from agendamentos;

