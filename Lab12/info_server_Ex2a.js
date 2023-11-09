const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with qs ' + JSON.stringify(request.query)) ;
    next(); 
});

app.post("/process_form", function (request, response) {
    let q = request.body['quantity0'];
    if (typeof q != 'undefined') {
    response.send(`Thank you for purchasing ${q} things!`);
    } 
 });

app.get('/test', function (request, response, next) {
    response.send('in route GET to /test');
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback