const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



/* Configuration import */
let config;
if (!process.env.HEROKU) {
    config = require('./config');
}

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


/** Swagger setup */

const swaggerDefinition = {
  info: {
    title: 'GranApp Swagger API Documentation',
    version: '1.0.0',
  },
  host: config.SWAGGER_HOST,
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [
    './index.js',
    './routes/*.js',
    './models/*.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json',function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Express Routers */
let admin_router = express.Router();
require('./routes/admin.js')(admin_router, db, mongojs, jwt, config);
app.use('/admin', admin_router);

let public_router = express.Router();
require('./routes/public.js')(public_router);
app.use('/public', public_router);

const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID || config.CLIENT_ID,
    process.env.CLIENT_SECRET || config.CLIENT_SECRET,
    process.env.REDIRECT_URL || config.REDIRECT_URL
);

/**
  * @swagger
  * / :
  *   get:
  *     tags:
  *       - login
  *     name: login
  *     summary: Use Google Open ID to login to the system. If the account does not exist, it will be created based on login info retrieved from Google.
  *     consumes:
  *       - application/json
  *     responses:
  *       200:
  *         description: Successful login
  *       500:
  *         description: Something is wrong with the service. Please contact the system administrator.
  */
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
                        exp: (Math.floor(Date.now() / 1000) + 3600), // token which lasts for an hour
                        id: doc._id,
                        type: doc.type
                    }, process.env.JWT_SECRET || config.JWT_SECRET);
                    /* Output the JWT */
                    res.json({ 'jwt' : jwtToken });
                });
            });
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
        //res.redirect(url); TMP Fix for swagger
        res.json({redirect_url: url});
      }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
