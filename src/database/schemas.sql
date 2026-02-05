/*USER SCHEMA */

CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    celular VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cep CHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    roles ENUM('cliente', 'barbeiro', 'adm') NOT NULL DEFAULT 'cliente' ,
    verificado BOOLEAN NOT NULL DEFAULT false,
    status BOOLEAN NOT NULL DEFAULT true,
    refresh_token TEXT NULL
);