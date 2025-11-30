USE marcaai_db;


CREATE TABLE servicos (
    id_servico INT AUTO_INCREMENT PRIMARY KEY,
    id_barbearia INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao INT NOT NULL,
    FOREIGN KEY (id_barbearia) REFERENCES barbearias(id)
);


select * from servicos;