var express = require('express');
var http = require("request");
var bodyParser = require('body-parser');
var secretSlack = require("./secrets/slack.js");
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("./public"));

app.post("/api/slack/signup", function(request, response) {
  console.log(request.body);
  http.post(
    {
      url: 'https://la-coders.slack.com/api/users.admin.invite',
      form: {
        email: request.body.email,
        token: secretSlack.token,
        set_active: true
      }
    },function(err, response) {
        if(!response.body.ok) {
          console.log(err);
        } else {
          console.log(response.body, ' it was a success');
        }
      }
  );
});


app.listen(9001, function() {
  console.log("App listening on port 9001");
});
