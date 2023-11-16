const express = require('express');
const app = express();
var product_data = require(__dirname + "/product_data.json");
const qs = require('querystring');


app.use(express.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with qs ' + JSON.stringify(request.query)) ;
    next(); 
});

app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    let products_str = `var products = ${JSON.stringify(product_data)};`;
    response.send(products_str);
 });
 
app.post("/process_form", function (request, response) {
    console.log('in process+form', request.body);

    let errors = {}; // assume no errors
    /*
    for(let i in product_data) { 
        let qty = request.body['quantity' + i];
        // validate quantities
        
        // check if nonnegint
        if(isNonNegInt(qty)===false) {  
            errors['quntity'+i] = isNonNegInt(qty, true);
        }
        // check iquanty is available

}
*/
    var qstr = qs.stringify(request.body);
    // if valid, create invoice
    if (Object.entries(errors).length === 0) {
        // reducce quantity available by quanties purchased

        response.redirect(`invoice.html?${qstr}`);
    } 
    // not valid, send back to display product
    else {
        response.redirect(`product_display.html`);
    }
 });

app.get('/test', function (request, response, next) {
    response.send('in route GET to /test');
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(q === '') {
        q = 0;
    }
    if (Number(q) != q) {
        errors.push('Not a number!'); // Check if string is a number value
    }
    else {
        if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
        if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    }

    return returnErrors ? errors : (errors.length == 0);
}