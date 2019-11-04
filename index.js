const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

/* Configuration import */
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

const db = mongojs(process.env.MONGODB_URL || config.MONGODB_URL);

app.use(express.static('public'));
app.use(bodyParser.json());

/* Global middleware */
app.use((req, res, next) => {
    console.log('Server time: ', Date.now());
    next();
});

/* Express Routers */
let admin_router = express.Router()
require('./routes/admin.js')(admin_router, db, mongojs, jwt);
app.use('/admin', admin_router);

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID || config.CLIENT_ID,
    process.env.CLIENT_SECRET || config.CLIENT_SECRET,
    process.env.REDIRECT_URL || config.REDIRECT_URL
);

app.get('/login', (req, res) => {
      let code = req.query.code;
      /* If redirected from Google API */
      if (code) {
        oauth2Client.getToken(code).then((result) => {
            oauth2Client.setCredentials({access_token: result.tokens.access_token});
            let oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
            
            oauth2.userinfo.get((err, response) => {
                if (err) {
                    throw err;
                }
                let data = response.data;
                // console.log(data);
                // res.send(data);

                db.users.findAndModify({ 
                    query: { email: data.email },
                    update: { $setOnInsert: { email: data.email, name: data.name, signup_time: new Date(), type: 'customer' } },
                    new: true,
                    upsert: true  
                }, (error, doc) => {
                    if (error) {
                        console.log(error);
                    }
                    let jwtToken = jwt.sign({
                        ...data,
                        id: doc._id,
                        type: doc.type
                    }, process.env.JWT_SECRET || config.JWT_SECRET);
                    /* Output the JWT */
                    res.json({ 'jwt' : jwtToken });
                });
            });
            // console.log(result);
        });
      /* If coming to the login URL for the first time */
      } else {
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
