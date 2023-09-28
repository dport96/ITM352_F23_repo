require("./products_data.js");

let num_products = 5;
let product_num = 1;
while(product_num <= num_products) {
    console.log(`${product_num}. ${eval('name' + product_num)}`);
    product_num++;
}