-- @block
DROP TABLE IF EXISTS surnames;

-- @block

CREATE TABLE IF NOT EXISTS surnames(
    id INT PRIMARY KEY AUTO_INCREMENT,
    isibongo VARCHAR(200) UNIQUE NOT NULL,
    izithakazelo TEXT,
    umlando TEXT,
    well_known_people JSON,
    images JSON 

);