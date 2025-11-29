USE marcaai_db;

CREATE OR REPLACE VIEW vw_servicos_barbearia AS
SELECT 
    bs.id AS id_relacao,
    b.id AS id_barbearia,
    s.id AS id_servico,
    s.nome AS nome_servico,
    s.descricao,
    s.duracao,
    bs.preco AS preco_venda
FROM barbearia_servicos bs
INNER JOIN barbearias b ON b.id = bs.id_barbearia
INNER JOIN servicos s ON s.id = bs.id_servico;
