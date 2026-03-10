CREATE TABLE empresa(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100),
    cnpj VARCHAR(20),
    telefone VARCHAR(40),
    link_url VARCHAR(150) UNIQUE,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT PK_ID_EMPRESA PRIMARY KEY (id)
);

CREATE TABLE usuarios(
    id INT NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(60) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    celular VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hash_senha VARCHAR(255) NOT NULL,
    cep CHAR(8) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    roles ENUM('cliente', 'barbeiro', 'adm') NOT NULL DEFAULT 'cliente',
    verificado BOOLEAN NOT NULL DEFAULT false,
    status ENUM('ativo', 'desativado'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_ID_USUARIO PRIMARY KEY (id)
);

CREATE TABLE servicos(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL UNIQUE,
    blocos INT NOT NULL,
    preco DECIMAL(6, 2) NOT NULL,
    status ENUM('ativo', 'desativado') NOT NULL DEFAULT 'ativo',

    CONSTRAINT PK_ID_SERVICO PRIMARY KEY (id)
);

CREATE TABLE agendamentos(
    id INT NOT NULL AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_servico INT NOT NULL,
    dia DATE NOT NULL,
    horario VARCHAR(10) NOT NULL,
    status ENUM('pendente', 'cancelado', 'concluido') NOT NULL DEFAULT 'pendente',
    feedback_local VARCHAR(255) default null,
    feedback_profissional VARCHAR(255) default null,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT PK_ID_AGENDAMENTO PRIMARY KEY (id),
    CONSTRAINT FK_ID_CLIENTE_AGENDAMENTO FOREIGN KEY(id_cliente) REFERENCES usuarios(id),
    CONSTRAINT FK_ID_PROFISSIONAL_AGENDAMENTO FOREIGN KEY(id_profissional) REFERENCES usuarios(id),
    CONSTRAINT FK_ID_SERVICO_AGENDAMENTO FOREIGN KEY(id_servico) REFERENCES servicos(id)
);

CREATE TABLE folga_profissionais(
    id INT NOT NULL AUTO_INCREMENT,
    id_profissional INT NOT NULL,
    dia_semana INT NOT NULL,

    CONSTRAINT PK_ID_FOLGA PRIMARY KEY (id),
    CONSTRAINT FK_ID_PROFISSIONAL_FOLGA FOREIGN KEY(id_profissional) REFERENCES usuarios(id)
);

CREATE TABLE dias_off(
    id INT NOT NULL AUTO_INCREMENT,
    data_off DATE NOT NULL UNIQUE,

    CONSTRAINT PK_ID_DIA_OFF PRIMARY KEY (id)
);

CREATE TABLE logs(
    id INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT PK_ID_LOG PRIMARY KEY (id),
    CONSTRAINT FK_ID_USUARIO FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);