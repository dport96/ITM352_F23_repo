const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next(); 
});

app.get('/test', function (request, response, next) {
    response.send('in route GET to /test');
});



app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback