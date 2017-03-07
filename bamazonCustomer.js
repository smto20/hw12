var inquirer = require('inquirer');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'Bamazon_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});

// display all items for sale and include id, name, price
connection.query('SELECT * FROM products', function(err, data) {
    if (err) throw err;
    console.log('Products: '); 
    console.log(data);
    // prompt user 1- ask ID of the product want to buy, 2 - ask how many want

    inquirer.prompt([
        {
        type: "input",
        message: "What is the id of the product you would like?",
        name: "id"
        }, {

        type: "input",
        message: "How many would you like to purchase?",
        name: "amount"

        }]).then(function (answers) {

            var idOfItem = answers.id;
            connection.query('SELECT * FROM products WHERE ?', {item_id: idOfItem}, function(err, data) {
                if (err) throw err;
                var item = data[0];
                if (answers.amount < item.stock_quantity) {

                    var amountLeft = item.stock_quantity - answers.amount;

                    var sale = answers.amount * item.price_to_customer;

                    connection.query('UPDATE products SET ? WHERE ?', [{
                        stock_quantity: amountLeft
                        }, {
                            item_id: idOfItem
                        }], function(err, data) {
                        if (err) throw err;
                        
                        console.log('The total is $' + sale + '.');

                        console.log('Number of ' + item.product_name + '(s) left: ' + amountLeft);

                    });

                } 

                else {

                    console.log("Insufficient quantity.");
                    return "Insufficient quantity.";
                } 

            });
    });
});