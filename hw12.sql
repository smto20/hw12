create database Bamazon_db;

use Bamazon_db;
create table products (
	item_id integer NOT NULL auto_increment,
    product_name varchar(60),
    department_name varchar(50),
    price_to_customer float(62,2),
    stock_quantity integer NOT NULL,
    constraint PRIMARY KEY (item_id)
);

-- products:
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Jean Jacket', 'clothing', 59.99, 1);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Suede Heels', 'shoes', 99.99, 10);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Bracelet', 'jewelry', 100.00, 1);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Lip Stain', 'makeup', 10.00, 5);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Candle', 'other', 15.99, 3);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Laptop Case',  'accessories', 19.99, 10);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
 	values ('Letterman Jacket', 'clothing', 500.00, 1);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('White Tee', 'clothing', 30.00, 10);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Gold Ring', 'jewelry', 12.00, 5);
INSERT INTO	products (product_name, department_name, price_to_customer, stock_quantity)
	values ('Side Purse', 'accessories', 60.00, 3);
