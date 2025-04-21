create database Finanzas_personales;
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE Transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM('ingreso', 'gasto') NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    fecha DATE NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Presupuestos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    categoria VARCHAR(100) NOT NULL,
    monto_presupuestado DECIMAL(10, 2) NOT NULL,
    periodo ENUM('mensual', 'anual') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Ahorros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre_objetivo VARCHAR(100) NOT NULL,
    monto_objetivo DECIMAL(10, 2) NOT NULL,
    fecha_limite DATE NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
