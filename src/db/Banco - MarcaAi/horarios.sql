USE marcaai_db;

CREATE TABLE horarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_profissional INT NOT NULL,
  dia_semana TINYINT NOT NULL,  
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  FOREIGN KEY (id_profissional) REFERENCES profissional(id)
);

INSERT INTO horarios (id_profissional, dia_semana, hora_inicio, hora_fim)
VALUES
(1, 1, '08:00', '18:00'),
(1, 2, '08:00', '18:00'),
(1, 3, '08:00', '18:00'),
(1, 4, '08:00', '18:00'),
(1, 5, '08:00', '18:00');
