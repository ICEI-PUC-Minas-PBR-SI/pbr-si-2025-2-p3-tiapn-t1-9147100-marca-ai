USE marcaai_db;

CREATE TABLE notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    lida TINYINT(1) DEFAULT 0
);

select * from notificacoes;