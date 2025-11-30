USE marcaai_db;

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_barbearia INT NOT NULL,
    id_profissional INT NOT NULL,
    estrelas INT NOT NULL,
    comentario TEXT,
    data_avaliacao DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_barbearia) REFERENCES barbearias(id) ON DELETE CASCADE,
    FOREIGN KEY (id_profissional) REFERENCES profissional(id) ON DELETE CASCADE
);

INSERT INTO avaliacoes (id_barbearia, id_profissional, estrelas, comentario)
VALUES (1, 1, 5, 'Serviço top demais!');


select * from avaliacoes;