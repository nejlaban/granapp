const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000

const db = mongojs('mongodb+srv://web-eng:web-eng@ibu-web-programming-b7utm.gcp.mongodb.net/granapp?retryWrites=true&w=majority', []); // heroku param config file

app.use(express.static('public'));
app.use(bodyParser.json());

var admin_router = express.Router()
require('./admin.js')(admin_router, db);

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});

app.use('/admin', admin_router);


const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
//meci ovde
  );

app.get('/login.html', function(req, res){
      var code = req.query.code;

      if (code){
        oauth2Client.getToken(code).then(function(result){
            oauth2Client.setCredentials({access_token: result.tokens.access_token});
            var oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
            
            oauth2.userinfo.get(
            function(err, res) {
                if (err) {
                console.log(err);
                } else {
                console.log(res);
                }
            });
            console.log(result);
            res.send(result);
        });
      }else{
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        
        const url = oauth2Client.generateAuthUrl({
            access_type: 'online',
            scope: scopes
        });
        res.redirect(url);
      }

      
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 