#Bamazon

A Node.js & MySQL command line Amazon-like storefront app that takes in customers orders and depletes stock from the stores Inventory.

Overview

#My Videos click here to see Bamazon Live! http://recordit.co/8pLazynjrh

Usage

Clone repo
npm install
cd Bamazon
node server.js
run it locally. Default Port will be PORT 3006 in any browser.

Tech Used

Node.js
MySQL
Cli-View
Inquirer
color

Instructions:
Customer Features:
 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
 
Bamazon then prompts users with two messages.

The first ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
Once an order has been placed the application then checks to see if the store has enough of the product to meet the user's request.

If not, the app will log: Insufficient quantity!, and then prevent the order from going through.
However, if the store does have enough of the product, It will fulfill the users's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, it will show the customer the total cost of their purchase.
Manager View

IN Manager level Features :

View Products for Sale-list every available item: the item IDs, names, prices, and quantities.
View Low Inventory-list all items with a inventory count lower than five.
Add to Inventory-let the manager "add more" of any item currently in the store
Add New Product-manager to add a completely new product to the store


In Supervisior Level Feauters:
Create a New Department 
sales and profit department wise.