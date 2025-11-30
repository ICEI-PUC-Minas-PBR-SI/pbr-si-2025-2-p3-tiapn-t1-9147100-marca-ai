USE marcaai_db;

DROP VIEW IF EXISTS vw_servicos_barbearia;

CREATE VIEW vw_servicos_barbearia AS
SELECT
    id_servico,
    id_barbearia,
    nome AS nome_servico,
    descricao,
    preco,
    duracao
FROM servicos;

SELECT * FROM vw_servicos_barbearia;

SELECT * FROM vw_servicos_barbearia WHERE id_barbearia = 1;


