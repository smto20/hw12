function Bamazon() {

var mysql = require("mysql");
var inquirer = require("inquirer");

var connector = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "Bamazon_db"
});

connector.connect(function(err) {
  if(err){
    console.log("Couldn't connect to Bamazon_db.");
    return;
  }
  console.log("Connection to Bamazon_db\n has been successfully established.");
});

///display all items available for sale with id,name, and prices
function storefrontDatabase() {
  connector.query('SELECT * FROM products', function(err, inventory) {
            if (err) throw err;

            console.log("Bamazon database products:\n");

            var separator = '¦̵̱ ̵̱ ̵̱ ̵̱ ̵̱(̢ ̡͇̅└͇̅┘͇̅ (▤8כ−◦';
            var selectedID = [];
            var stock = [];
            var cost = [];

            for (var i = 0; i < inventory.length; i++) {
                console.log(inventory[i].item_id + " | " + inventory[i].department_name);
                console.log(separator);
                console.log("  product name      = " + inventory[i].product_name);
                console.log("  price per unit    = " + inventory[i].price_to_customer);
                console.log("  quantity in stock = " + inventory[i].stock_quantity);
                console.log('');
                selectedID.push("" + inventory[i].item_id);
                stock.push("" + inventory[i].stock_quantity);
                cost.push("" + inventory[i].price_to_customer);
            }

            selection(selectedID, stock, cost);

        });
    }
//prompt users 1 - ask id of product want, and 2 - ask how many units of product
    function selection(options, quantities, price) {

        inquirer.prompt([{
                type: "list",
                name: "option",
                message: "What is the item_id of the product you would like to buy?",
                choices: options
            }, {

                type: "input",
                message: "What many units of the product would you like?",
                name: "quantity"
            }

        ]).then(function(choices) {

            var index = choices.option - 1;
            var grandTotal = choices.quantity * price[index];
            console.log("item id = " + options[index]);
            console.log("quantity available = " + quantities[index]);
            console.log("quantity wanted = " + choices.quantity);

            if (parseInt(choices.quantity) > parseInt(quantities[index])) {
                console.log("Insufficient quantity in stock to complete order.\n");
                connector.end();
            } else {
                choices.quantity = quantities[index] - choices.quantity;
			console.log("The price of each item in this order = " + price_to_customer[index]);
            console.log("The total price of the order = " + grandTotal);
                inventoryUpdate(choices);
            }/
        });
//make inventory show updated qty in db
        function inventoryUpdate(choices) {
            var setInventory = {stock_quantity: parseInt(choices.quantity)};
            var itemChange = { item_id: choices.option};

            connector.query('UPDATE products SET ? WHERE ?', [setInventory, itemChange], function(err, res) {
                if (err) throw err;
            	console.log('Thanks for your purchase!');
              connector.end();
            });
        }
    }
    storefrontDatabase();
}

Bamazon();
