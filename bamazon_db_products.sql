CREATE database bamazon_DB;

use bamazon_DB;

CREATE table products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price INTEGER DEFAULT 0,
stock_quantity INTEGER DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('A Tour of C++', 'Books', 20, 5),
('ECHO', 'Electronics', 80, 10),
('Kindle', 'Electronics', 70, 20),
('Mens Plaid Flannel', 'Clothing', 20, 30),
('Womens Ugg Boots', 'Shoes', 170, 60),
('Hammock', 'Outdoor', 80, 80),
('BBQ Grill', 'Garden', 400, 100),
('Playstation 4', 'Electronics', 250, 1),
('Hot Pot', 'Kitchen', 100, 40),
('Starwars', 'Movie', 20, 50);