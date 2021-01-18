/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

 import { Group } from "./model/Group"

var test = new Group("A", "Test_group");

test.addUser("B");
test.addExpense("A", "2 pizzas", 20);
test.addExpense("B", "1 pack de bieres", 7);
test.addUser("C");
test.addUser("D");
test.deleteExpense(1);
test.addExpense("B", "2 packs de bieres", 14);
test.addExpense("C", "Verres a shot", 5.99);
test.addUser("E");
test.addUser("F");
test.addExpense("F", "1 bouteille de vodka", 14.99);
test.addExpense("E", "3 bouteille de diluant", 8);
test.settle_group_balance();