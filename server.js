var express = require('express');
var http = require("request");
var bodyParser = require('body-parser');
var secretSlack = require("./secrets/slack.js");
var app = express();

app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.send('Vegeta, what does the scouter say???');
});

app.post("/api/slack/signup", function(request, response) {
  console.log(request.body);
  request.post(
    {
      url: 'https://la-coders.slack.com/api/users.admin.invite',
      form: {
        email: request.body.email,
        token: secretSlack.token,
        set_active: true
      }
    },function(err, response) {
        if(err) {
          console.log(err);
        } else {
          console.log(response, ' it was a success');
        }
      }
  );

});


app.listen(9001, function() {
  console.log("App listening on port 9001");
});
