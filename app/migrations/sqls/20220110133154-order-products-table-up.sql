CREATE TABLE order_products (
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    PRIMARY KEY(order_id,product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
     ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
     ON DELETE CASCADE    
);
