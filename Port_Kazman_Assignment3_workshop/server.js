
var fs = require('fs');
var myParser = require("body-parser");
var qs = require('querystring');
var express = require('express');
var app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

var products = require('./product_data.json');

var user_quantity_data; // make a global variable to hold the product selections until we get to the invoice

var users_reg_data = require(__dirname + '/registration_data.json');
/*
// get the user data
if (fs.existsSync(filename)) {
    var stats = fs.statSync(filename);
    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else {
    console.log(filename + ' does not exist!');
}
*/

// Routing and middleware
app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (req, res, next) {
    console.log(`${req.method} request to ${req.path}`);
    next();
});

app.get('/products', function (req, res, next) {
    res.json(products);
});

app.get('/purchase', function (req, res, next) {
    user_quantity_data = req.query; // save for later
    if (typeof req.query['purchase_submit'] != 'undefined') {
        console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));

        user_quantity_data = req.query; // get the query string data which has the form data
        // form was submitted so check that quantities are valid then redirect to invoice if ok.

        has_errors = false; // assume quantities are valid from the start
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            if (user_quantity_data[`quantity${i}`] != 'undefined') {
                a_qty = user_quantity_data[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // oops, invalid quantity
                }
            }
        }
        // Now respond to errors or redirect to login if all is ok
        if (has_errors || total_qty == 0) {
            res.redirect('products_display.html?' + qs.stringify(user_quantity_data));
        } else { // all good to go!
            res.redirect('login');
        }

    }
});

app.get("/login", function (request, response) {
    // only allow login after selecting products
    if (typeof user_quantity_data != 'undefined') {
        // Give a simple login form
        str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href="register">Click here to regsiter<a>
</body>
    `;
        response.send(str);
    } else {
        str = `
    <head>
    <script>
        alert('You need to select some products before logging in');
        
        window.location = './products_display.html';
    </script>
    </head>
        `;
        response.send(str);
    }


});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    the_username = request.body['username'];
    the_password = request.body['password'];
    if (typeof users_reg_data[the_username] != 'undefined') {
        if (users_reg_data[the_username].password == the_password) {
            user_quantity_data['username'] = the_username;
            // send a username cookie to indicate logged in
            response.cookie ("username", the_username, {expire: Date.now() + 5*1000});

            response.redirect('/invoice.html?' + qs.stringify(user_quantity_data));
        } else {
            response.redirect('/login');
        }
    }
});

app.get("/register", function (request, response) {
    // only allow login after selecting products
    if (typeof user_quantity_data != 'undefined') {
        // Give a simple register form
        str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
        response.send(str);
    } else {
        str = `
        <head>
        <script>
            alert('You need to select some products before registering!');
            
            window.location = './products_display.html';
        </script>
        </head>
            `;
        response.send(str);
    }
});

app.post("/register", function (request, response) {
    // process a simple register form
    username = request.body.username;
    // validate the user info before saving 
    // check is username taken

    users_reg_data[username] = {};
    users_reg_data[username].password = request.body.password;
    users_reg_data[username].email = request.body.email;
    fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    console.log("Saved: " + users_reg_data);
    user_quantity_data['username'] = username; // add the username to the data that will be sent to the invoice so the user can be identified with this transient data
    response.redirect('/invoice.html?' + qs.stringify(user_quantity_data)); // transient data passed to invoice in a query string
});

app.use(express.static(__dirname + '/static'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });

// helper functions
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}