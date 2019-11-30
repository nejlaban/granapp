# GranApp

## Configuration
In order to support both back-end and front-end applications, we need to create two folders: `api`  (Node.js) and `frontend` (React.js). Each of these folders will have its respective `package.json` file, defining their depenedencies. Moreover, we will have a "global" `package.json` file in the project root, which will defining the server development, start and build scripts.

Additionally, we need to move the ignored files and directories from each separate `.gitignore` to the project's `.gitignore`.

- create react frontend: `npx create-react-app frontend`

### Running the development server

In order to be able to run two Node.js apps (Express back-end and React development server) simultaneously, we need to install the `concurrently` NPM module as a development dependency.

`npm install --save-dev concurrently`

Afterwards, we will define several NPM scripts in the root `package.json`:
- **install**: `cd api && npm install && cd ../frontend && npm install` - Install front-end and back-end dependencies
  - Note that this script will first try to install the global (project) dependencies, followed by the specific back-end and front-end dependencies. If you want to *only* install dependencies for one of them, `cd` to the correct folder and run `npm install`.
  - Make sure to run this script when downloading the project for the first time.
- **backend**: `cd api && nodemon index.js` - Start the Express server
- **frontend**: `cd frontend && npm start` - Start the React development server
- **dev**: `concurrently --kill-others \"npm run backend\" \"npm run frontend\"` - Simultaneously start the back-end and front-end applications

If we want to start the entire development environment, we will run `npm run dev`. This way, both our back-end server and front-end React development server will be started at the same time, on different ports. In the console output, Express will be denoted by `[0]` and React by `[1]`. Alternatively, if we only want to modify the Express server, or the React.js application, we can run `npm run backend` or `npm run frontend`.
- Since React's development server uses port 3000 by default, make sure to change your Express application port, if they are using the same value.
- The `backend` script assumes you have `nodemon` installed; if you do not, install it, or change the command to `node`.
- Note that HTTP requests from the front-end *will not work* if the back-end is not started.

### Deploying to Heroku

During development, our React application will be started on a live server. However, if we want to deploy our project to Heroku, we need to **build** (compile) the application to static HTML, JS and CSS files, and **serve** it using the `express.static()` middleware. In order to do that, we are going to define an additional NPM script:
- **start**: `cd frontend && npm run build && cd ../api && node index.js` - Build the React application front-end, and run the Express back-end

When the React application is compiled using `npm run build`, its files will be saved to `frontend/build`. In our Express code, we will point the static middleware to this route:
```js
app.use('/', express.static('./../frontend/build'));
```
Now, when the root route (`/`) of our project is accessed, the front-end application will be served in full.

## Notes
You can see the required back-end configuration constants in `api/config.sample.js`.
