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
var inventory = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'items',
            message: 'What would you like to do ??.'.blue,
            choices: [{
                name: 'ViewProductSalesbyDepartment'.red
            }, {
                name: 'CreateNewDepartment'.green
            },{
                name: 'Quit'.grey
            },]
        },
    ]).then(function (selection) {
        if (selection.items === 'ViewProductSalesbyDepartment'.red) {
            salebydep()
        } else if (selection.items === 'CreateNewDepartment'.green) {
            adddept();
        } else if (selection.items === 'Quit'.grey){
            quit();
        }else {
            console.log('You picked an invalid choice!');
            connection.end();
        }
    });//inquirer end
}//end
var salebydep = function () {
    var query = connection.query('SELECT * FROM departments', function (error, res) {
        if (error) { console.log(error) }
    // var sales=  connection.query( 'SELECT  d.department_id,d.department_name,d.over_head_costs,T.prod_sales FROM departments d ',
    //     JOIN ,'SELECT SUM(product_sales) as prod_sales,department_name FROM products AS TEMP GROUP BY department_name' T
    //     ON d.department_name = T.department_name); 
    //    console.log("sales"+sales) ;
        var table = new Table({
            head: ['Dep ID', 'Dep NAME', "OHC", 'Sale', 'Totalprofit']
            , colWidths: [5, 40, 10, 10, 10]
        });

        for (var i = 0; i < res.length; i++) {
            var profit = (res[i].over_head_costs - res[i].product_sales)
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, profit]
            );
        }
        console.log(table.toString());
        inventory()
        //connection.end();
    }) 

}
var adddept = function () {
    inquirer.prompt([
        {
            type: "number",
            message: "Whats  product id ? (the Product ID)".grey,
            name: "itemNumber"
        },
        {
            type: 'input',
            name: 'depname',
            message: 'Please enter the name of the new department you would like to add.'.red
        }, {
            type: 'input',
            name: 'ohc',
            message: 'What are the overhead costs for this department?.'.red
        },]).then(function (user) {
            connection.query("INSERT INTO departments SET ?", {
                department_id: user.itemNumber,
                department_name: user.depname,
                over_head_costs: user.ohc,
                product_sales: 0,

            }, function (err, res) {
                if (err) throw err;
                console.log("\nYour Department has been added!\n".rainbow);
                inventory();
               
            })
            //connection.end();
        });
}
var quit=function()
{
    connection.end();
}
