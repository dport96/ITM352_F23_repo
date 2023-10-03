require("./products_data.js");

let num_products = 5;

for(let product_num = 0; product_num < num_products, product_num++) {
    if(product_num > num_products/2) {
        console.log('Don’t ask for anything else!');
        process.exit(1);
    }
    if(product_num > num_products*0.25 && product_num < num_products*0.75 ) {
        console.log(`${eval('name' + (product_num) )} is sold out!`);
        continue;
    }
    console.log(`${product_num}. ${eval('name' + (product_num) )}`);


}
console.log('That\'s all!');