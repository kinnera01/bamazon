DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL ,
  product_name VARCHAR(1000) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(11,2),
  PRIMARY KEY (item_id)
);
select * from products;
USE bamazon_DB;

CREATE TABLE departments(
  department_id INT NOT NULL, 
  department_name VARCHAR(1000) NOT NULL,
  over_head_costs  DECIMAL(11,2) NOT NULL,
  -- product_sales DECIMAL(11,2) NOT NULL,
  PRIMARY KEY (department_id)
  );
  select * from departments;
-- This creates the alias table TotalProfits that will exist only when requested by the executive 
-- SHOW TABLES
-- CREATE VIEW bamazon_DB.TotalProfits AS SELECT department_id,department_name,over_head_costs,TotalSales,TotalSales-over_head_costs AS TotalProfit FROM departments;

