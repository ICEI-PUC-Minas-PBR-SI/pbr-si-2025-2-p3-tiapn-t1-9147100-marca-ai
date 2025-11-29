USE marcaai_db;

CREATE OR REPLACE VIEW vw_profissionais_barbearia AS
SELECT
    p.id AS id_profissional,
    p.id_barbearia,
    p.nome AS nome_profissional,
    p.especialidade,
    p.telefone,
    b.nome AS nome_barbearia
FROM profissional p
JOIN barbearias b ON b.id = p.id_barbearia;
