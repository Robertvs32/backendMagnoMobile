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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    refresh_token TEXT NULL
);

/*SERVICOS SCHEMA*/
CREATE TABLE servicos(
    id_servico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    blocos INT NOT NULL,
    preco DECIMAL(6, 2) NOT NULL,
    tempo VARCHAR(100) NOT NULL
);

/*AGENDAMENTOS SCHEMA*/
CREATE TABLE agendamentos(
    id_agendamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_servico INT NOT NULL,
    dia DATE NOT NULL,
    horas JSON NOT NULL,
    status ENUM('pendente', 'cancelado', 'concluido') NOT NULL DEFAULT 'pendente',
    feedback_local VARCHAR(255) default null,
    feedback_profissional VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_id_cliente FOREIGN KEY(id_cliente) REFERENCES usuarios(id),
    CONSTRAINT fk_profissional FOREIGN KEY(id_profissional) REFERENCES usuarios(id),
    CONSTRAINT fk_id_servico FOREIGN KEY(id_servico) REFERENCES servicos(id_servico)
);

/*FOLGAS SCHEMA*/
CREATE TABLE folga_profissionais(
    id_folga INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT NOT NULL,
    dia_da_semana INT NOT NULL,

    CONSTRAINT fk_id_profissional FOREIGN KEY(id_profissional) REFERENCES usuarios(id)
);


/*DIAS OFF SCHEMA*/
CREATE TABLE dias_off(
    id_off INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_off DATE NOT NULL UNIQUE
);


/*AUDIT LOGS SCHEMA*/
CREATE TABLE audit_logs(
    id_log INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    id_usuario INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);