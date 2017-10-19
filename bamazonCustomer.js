var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');
module.exports = connection,displayitems,selectitem;
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
    displayitems();
});
//display all items available for sale
var displayitems=function() {
    console.log("Display all items avilable:");
    var query = connection.query('SELECT * FROM products', function (error, res) {
        if (error) { console.log(error) }
        var table = new Table({
            head: ['ITEM ID', 'NAME',"DEPARTMENT",'PRICE']
          , colWidths: [5,80,30,10]
        });
        // var item = '';
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name,res[i].department_name,res[i].price]
            );           
        }
        console.log(table.toString());
        selectitem();
    });
};
var selectitem=function (){
    inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.'.blue,
		     validate: function (input) {
                if (input === '') {
                    console.log('Please enter valid Id'.red);
                    return false;
                } else {
                    return true;
                }
            },
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?'.cyan,
			validate: function (input) {
                if (input === '') {
                    console.log('Please enter Qty:'.red);
                    return false;
                } else {
                    return true;
                }
            },
			filter: Number
		} 	
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;
		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, res) {
			if (err) throw err;
			if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.'.red);
				displayitem();

			} else {
				var productData = res[0];
				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!'.yellow);
					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					var totalcost =productData.price * quantity;
					var rev=productData.product_sales+totalcost;
					var updaterevenue = 'UPDATE products SET  product_sales = ' +rev + ' WHERE item_id = ' + item;
					connection.query(updaterevenue, function(err, res) {						
						if (err) throw err;
						console.log('Your Revenue for this Product is generated! Your total is $'.green + rev);
		
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
					})
					connection.query(updateQueryStr, function(err, res) {						
						if (err) throw err;
						console.log('Your oder has been placed! Your total is $'.green + totalcost);
						console.log('Thank you for shopping with us!'.rainbow);
						console.log("\n---------------------------------------------------------------------\n");
						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.'.orange);
					console.log('Please modify your order.'.grey);
					console.log("\n---------------------------------------------------------------------\n");

					displayitems();
				}
			}
		})
	})
}
