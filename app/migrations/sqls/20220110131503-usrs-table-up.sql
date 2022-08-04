CREATE TABLE usrs (id SERIAL PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    passwd TEXT NOT NULL,
    UNIQUE(firstName,lastName) );