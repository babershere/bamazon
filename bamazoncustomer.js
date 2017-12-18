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
    console.log("Connected as id: " + connection.threadId);
    display();
})

var display = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("Welcome to Bamazon! Feel free to check out the Items I have for sale Below!")
        console.table(res);
        // inquirer.prompt({
        //     name: "items",
        //     type: "list",
        //     message: "Welcome to Bamazon! Feel free to browser around!",
        //     choices: function (value) {
        //         var choiceArray = [];
        //         for (var i = 0; i < res.length; i++) {
        //             choiceArray.push(res[i].product_name);
        //         }
        //         return choiceArray
                
        //     }
        // })
    })
};