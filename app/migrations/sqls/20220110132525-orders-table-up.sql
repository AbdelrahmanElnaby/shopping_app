CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status VARCHAR(10) NOT NULL,
    FOREIGN KEY (user_id)     
    REFERENCES usrs(id) ON DELETE SET NULL);