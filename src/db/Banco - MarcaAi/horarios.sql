USE marcaai_db;

DROP TABLE IF EXISTS horarios;

CREATE TABLE horarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_profissional INT NOT NULL,
  dia_semana TINYINT NOT NULL,   -- 0 = domingo ... 6 = sábado
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  FOREIGN KEY (id_profissional) REFERENCES profissional(id)
);

INSERT INTO horarios (id_profissional, dia_semana, hora_inicio, hora_fim)
SELECT p.id, d.dia_semana, d.hora_inicio, d.hora_fim
FROM profissional p
CROSS JOIN (
    SELECT 1 AS dia_semana, '08:00:00' AS hora_inicio, '18:00:00' AS hora_fim UNION
    SELECT 2, '08:00:00', '18:00:00' UNION
    SELECT 3, '08:00:00', '18:00:00' UNION
    SELECT 4, '08:00:00', '18:00:00' UNION
    SELECT 5, '08:00:00', '18:00:00' UNION
    SELECT 6, '08:00:00', '12:00:00'
) d;



SELECT * FROM horarios;
