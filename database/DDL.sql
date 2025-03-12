DROP DATABASE IF EXISTS agenda;
CREATE DATABASE agenda;
USE agenda;

CREATE TABLE Contatos 
( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 Nome VARCHAR(40),  
 Telefone VARCHAR(20),  
 Email VARCHAR(80)
); 

-- CREATE
DELIMITER $
CREATE PROCEDURE pAdicionarContato(
    IN p_Nome VARCHAR(40),  
    IN p_Telefone VARCHAR(20),  
    IN p_Email VARCHAR(80)
)
BEGIN
    INSERT INTO Contatos (Nome, Telefone, Email)
    VALUES (p_Nome, p_Telefone, p_Email);
END $
DELIMITER;


-- READ
DELIMITER $
CREATE PROCEDURE pListarContato()
BEGIN
    SELECT * FROM Contatos;
END $
DELIMITER;

-- UPDATE
DELIMITER $
CREATE PROCEDURE pAtualizarContato(
    IN p_id INT,  
    IN p_Nome VARCHAR(40),  
    IN p_Telefone VARCHAR(20),  
    IN p_Email VARCHAR(80)
)
BEGIN
    UPDATE Contatos
    SET Nome = p_Nome, Telefone = p_Telefone, Email = p_Email
    WHERE id = p_id;
END $
DELIMITER;

-- DELETE
DELIMITER $
CREATE PROCEDURE pDeletarContato(
    IN p_id INT
)
BEGIN
    DELETE FROM Contatos
    WHERE id = p_id;
END $
DELIMITER;
