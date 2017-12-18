/* Then create a Node application called bamazonCustomer.js.
Running this application will first display all of the items available for sale.
Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check 
if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity! , 
and then prevent the order from going through.
//     However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.*/

var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

connection.connect(function (err) {
    // console.log("Connected as id: " + connection.threadId);
    display();
})

var itemId = 0;
var quantity = 0;
var display = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("Welcome to Bamazon! Feel free to check out the Items we have for sale Below!")
        console.table(res);

        inquirer.prompt({
            name: 'id',
            message: "Please enter the ID you want to purchase!"
        }).then(function(input) {
            itemId = input.id;
         
        }).then( function() {
            inquirer.prompt({
                name: 'amount',
                message: 'How many units of ' + res[itemId  -1].product_name + ' do you want to buy?'
            }).then( function(input) {
                quantity = input.amount;
                return;
            }).then(function checkForQuantity() {
                if (res[itemId - 1].stock_quantity >= quantity) {
                    fullfillOrder(res[itemId - 1])
                } else {
                    console.log('Sorry this item is back ordered, please check back again soon');
                }
                return;
            });
        });

        function fullfillOrder(orderItem) {
            var newQuantity = orderItem.stock_quantity - quantity;
            connection.query('UPDATE products SET ? WHERE ?', [
                {
                    stock_quantity: newQuantity
                },
                {
                    item_id: orderItem.item_id
                }
            ], function (err, res) {
                console.log('You just purchased', quantity, orderItem.product_name, 'for a total of', orderItem.price * quantity, ' Dollars');
            });
        }
    })
};