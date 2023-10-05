require("./products_data.js");


for(let product_num = 1; eval("typeof name"+product_num) != 'undefined'; product_num++) {
    // document.write(`<tr><td>${product_num}</td><td>${eval('name' + (product_num)}</td></tr>`);
    /*
    if(product_num > num_products/2) {
        console.log('Don’t ask for anything else!');
        process.exit(1);
    }
    if(product_num > num_products*0.25 && product_num < num_products*0.75 ) {
        console.log(`${eval('name' + (product_num) )} is sold out!`);
        continue;
    }
    */
    console.log(`<tr><td>${product_num}</td><td>${eval('name' + (product_num))}</td></tr>`);


}
console.log('That\'s all!');