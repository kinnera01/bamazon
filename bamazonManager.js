var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');
//var prompt = require('prompt');
// create the connection information for the sql database
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
    inventory();
});
//display all items available for sale
var inventory=function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'items',
            message: 'What would you like to do ??.'.blue,
            choices: [{
                name: 'view-items'.red
            }, {
                name: 'view-low-inventory'.green
            }, {
                name: 'add-inventory'.yellow
            }, {
                name: 'add-products'.cyan
            },
            {
                name: 'delete-products'.blue
            },
            {
                name: 'Quit'.grey
            }]
        },
    ]).then(function (selection) {
        if (selection.items === 'view-items'.red) {
            inventoryitems()
        } else if (selection.items === 'view-low-inventory'.green) {
            lowinventoryitems();
        } else if (selection.items === 'add-inventory'.yellow) {
            addtoinventory();
        } else if (selection.items === 'add-products'.cyan) {
            addproductstoinventory();
        }
        else if (selection.items === 'delete-products'.blue){
            Deleteitems();
        }else if (selection.items === 'Quit'.grey){
            quit();
        }
    });//inquirer end
}//end
var inventoryitems=function() {
    var query = connection.query('SELECT * FROM products', function (error, res) {
        if (error) { console.log(error) }
        var table = new Table({
            head: ['ITEM ID', 'NAME', "DEPARTMENT", 'QUANTITY', 'PRICE']
            , colWidths: [5,80,30, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity, res[i].price]
            );
        }
        console.log(table.toString());
        inventory();
    }) // inventory();

}
 var lowinventoryitems=function() {
    connection.query('SELECT * FROM products WHERE stock_quantity<5', function (error, res) {
        var table = new Table({
            head: ['ITEM ID', 'NAME', "DEPARTMENT", 'QUANTITY'], colWidths: [5, 50, 50, 10]
        });
        
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        inventory();
    })
  
    //connection.end();
}
var viewInventory=function() {
    //starts the connection to the mysql database Products and only returns items that have a stock quantity of less than 5
    connection.query('SELECT * FROM Products WHERE StockQuantity < 5', function (err, res) {
        console.log('');
        console.log('Items With Low Inventory');
        console.log('');

        var table = new Table({
            head: ['ITEM ID', 'NAME', "DEPARTMENT", 'QUANTITY', 'PRICE'],
            colWidths: [5,80,30, 10, 10]
        });

        //loops through the data returned from mysql and pushes it into the table to be logged on the console
        
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        inventory();
       // connection.end();
    })
};

//creates the function for the third option of the prompt
var addtoinventory=function() {
    console.log("hi");
    connection.query('SELECT * FROM products', function (err, res) {
        var table = new Table({
            head: ['ITEM ID', 'NAME', "DEPARTMENT", 'QUANTITY', 'PRICE'],
            colWidths: [5,80,30, 10, 10]
        });      //loops through the data returned from mysql and pushes it into the table to be logged on the console
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        inquirer.prompt([
            {
                type: "number",
                message: "Which product would you like to add to? (the Product ID)".grey,
                name: "itemNumber"
            },
            {
                type: "number",
                message: "How many more would you like to add?".red,
                name: "qty"
            },
        ]).then(function (user) {
            console.log("itemno" + user.itemNumber);
            var i = user.itemNumber -1;
            // console.log(res);
            var newQuantity = parseInt(res[i].stock_quantity) + parseInt(user.qty);
            console.log("NewQty:" + newQuantity)
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQuantity,
            }, {
                item_id: user.itemNumber
            }], function (error, results) {
                if (error) throw error;

                console.log("\nYour quantity has been updated!\n");
                inventory();
            });
         //   connection.end()
        });
    });
}
var addproductstoinventory=function(){
    connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity)', function (err, res) {
        inquirer.prompt([
            {
                type: "number",
                message: "Which product would you like to add to? (the Product ID)".grey,
                name: "itemNumber"
            },{
                type: "input",
                message: "Which product would you like to add? (the Product NAME)".red,
                name: "itemName"
            },{
                type: "number",
                message: "In Which Department you would like to add product? (the Product DEP)".green,
                name: "itemDep"
            },{
                type: "number",
                message: "Whats the price of product? (the Product price)".blue,
                name: "itemprice"
            },
            {
                type: "number",
                message: "How many more would you like to add?".cyan,
                name: "itemqty"
            },
        ]).then(function (user) {
            // console.log(res);
            connection.query("INSERT INTO products SET ?", {
                item_id:user.itemNumber,
                product_name: user.itemName,
                department_name: user.itemDep,
               price: user.itemprice,
                stock_quantity: user.itemqty
            }, function(err, res) {
                if(err) throw err;
                console.log("\nYour product has been added!\n");
                inventoryitems()
                //connection.end();
            })

        });
    })
}
var Deleteitems=function(){
    connection.query('DELETE FROM products WHERE ?', function (err, res) {
        inquirer.prompt([
            {
                type: "number",
                message: "Which product would you like to delete? (the Product ID)".green,
                name: "itemNumber"
            }]).then(function (user) {
                connection.query( 'DELETE FROM products WHERE ?',{
                    item_id:user.itemNumber
                    },function(err, res) {
                        if(err) throw err;
                        console.log("\nYour product has been deleted!\n".red);
                        inventoryitems();
                      //  connection.end();
                    })
            })
    
})
}
var quit=function()
{
    connection.end();
}