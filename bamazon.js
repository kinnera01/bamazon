// var connection =require('./bamazonCustomer.js');
// var displayitems=require('./bamazonCustomer.js');
// var selectitem=require('./bamazonCustomer.js');
// var inventory=require('./bamazonManager.js');
// var inventoryitems=require('./bamazonManager.js');
// var lowinventoryitems=require('./bamazonManager.js');
// var viewInventory=require('./bamazonManager.js');
// var addtoinventory=require('./bamazonManager.js');
// var addproductstoinventory=require('./bamazonManager.js');
// var Deleteitems=require('./bamazonManager.js');
var bamazonCustomer =require('./bamazonCustomer.js');
var bamazonManager=require('./bamazonManager.js');
var bamazonSupervisor=require('./bamazonSupervisor.js')
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Kinnera06",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
   connection.end();
});
inquirer.prompt([{
    name: 'Category',
    message: 'What would you like to do?'.blue,
    type: 'list',
    choices: [{
        name: 'Customer'.red
    }, {
        name: 'Manager'.green
    }, {
        name: 'Supervisor'.yellow
    }]
}]).then(function (answer) {
    if (answer.command === 'Customer'.red) {
        bamazonCustomer();
    } else if (answer.command === 'Manager'.green) {
        //bamazonManager();
    }else if (answer.command === 'Supervisor'.yellow) {
        //bamazonSupervisor();
    }
});