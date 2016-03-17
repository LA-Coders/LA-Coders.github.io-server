var express = require('express');

var app = express();

app.get("/", function(request, response) {
  response.send('Vegeta, what does the scouter say???');
});

app.listen(9001, function() {
  console.log("App listening on port 9001");
});
