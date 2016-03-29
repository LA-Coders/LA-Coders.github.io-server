var express = require('express');
var http = require("request");
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 9001;
app.use(favicon(__dirname + '/public/fav/favicon.ico'));
app.use("/", express.static("./public"));

if(!process.env.PRODUCTION) {
  process.env.SLACK_TOKEN = require("./secrets/slack.js");
}


app.post("/api/slack/signup", function(request, response) {
  console.log(request.body);
  http.post(
    {
      url: 'https://la-coders.slack.com/api/users.admin.invite',
      form: {
        email: request.body.email,
        token: process.env.SLACK_TOKEN,
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


app.listen(port, function() {
  console.log("App listening on port 9001");
});
