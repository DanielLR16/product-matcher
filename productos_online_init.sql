-- Crear schema
CREATE DATABASE IF NOT EXISTS product_matching;
USE product_matching;

-- =========================
-- TABLA clients
-- =========================
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    identifier VARCHAR(50) NOT NULL UNIQUE
);

-- =========================
-- TABLA client_products
-- =========================
CREATE TABLE client_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    CONSTRAINT uq_client_product UNIQUE (client_id, name)
);

-- =========================
-- TABLA product_relations
-- =========================
CREATE TABLE product_relations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_a INT NOT NULL,
    product_b INT NOT NULL,
    CONSTRAINT fk_product_a FOREIGN KEY (product_a) REFERENCES client_products(id) ON DELETE CASCADE,
    CONSTRAINT fk_product_b FOREIGN KEY (product_b) REFERENCES client_products(id) ON DELETE CASCADE,
    CONSTRAINT uq_relation UNIQUE (product_a, product_b),
    CONSTRAINT chk_different CHECK (product_a < product_b)
);

-- =========================
-- TRIGGERS
-- =========================
DELIMITER $$

-- Trigger BEFORE INSERT
CREATE TRIGGER trg_product_relations_before_insert
BEFORE INSERT ON product_relations
FOR EACH ROW
BEGIN
    DECLARE client_a INT;
    DECLARE client_b INT;

    -- Obtener cliente del producto A
    SELECT client_id INTO client_a 
    FROM client_products 
    WHERE id = NEW.product_a;

    -- Obtener cliente del producto B
    SELECT client_id INTO client_b 
    FROM client_products 
    WHERE id = NEW.product_b;

    -- Si son del mismo cliente, lanzar error
    IF client_a = client_b THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No se permite relacionar productos del mismo cliente';
    END IF;
END$$

-- Trigger BEFORE UPDATE
CREATE TRIGGER trg_product_relations_before_update
BEFORE UPDATE ON product_relations
FOR EACH ROW
BEGIN
    DECLARE client_a INT;
    DECLARE client_b INT;

    SELECT client_id INTO client_a 
    FROM client_products 
    WHERE id = NEW.product_a;

    SELECT client_id INTO client_b 
    FROM client_products 
    WHERE id = NEW.product_b;

    IF client_a = client_b THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No se permite relacionar productos del mismo cliente';
    END IF;
END$$

DELIMITER ;

-- =========================
-- INSERTAR CLIENTES
-- =========================
INSERT INTO clients (name, identifier) VALUES
('Worten', 'worten'),
('MediaMarkt', 'mediamarkt'),
('Carrefour', 'carrefour'),
('Amazon', 'amazon'),
('El Corte Inglés', 'eci'),
('PCComponentes', 'pccomponentes'),
('Fnac', 'fnac'),
('Alcampo', 'alcampo'),
('Eroski', 'eroski'),
('Sprinter', 'sprinter');
