require("./products_data.js");

let num_products = 5;
let product_num = 1;
while(product_num < num_products/2 ) {
    console.log(`${product_num}. ${eval('name' + (product_num) )}`);
    product_num++;

}
console.log('That\'s all we have!');