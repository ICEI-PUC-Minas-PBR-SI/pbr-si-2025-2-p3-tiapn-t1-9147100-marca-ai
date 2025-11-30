USE marcaai_db;

CREATE OR REPLACE VIEW view_horarios_profissionais AS
SELECT 
    h.id AS id_horario,
    h.id_profissional,
    p.nome AS nome_profissional,
    h.dia_semana,
    h.hora_inicio,
    h.hora_fim
FROM horarios h
INNER JOIN profissional p
    ON p.id = h.id_profissional;

SELECT * FROM view_horarios_profissionais;
