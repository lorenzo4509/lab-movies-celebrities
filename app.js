// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');
const Celebrity = require("./models/Celebrity.model");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);
const celebritiesRoutes = require("./routes/celebrities.routes");
const moviesRoutes = require("./routes/movies.routes");
app.use("/celebrities", celebritiesRoutes);
app.use("/movies", moviesRoutes);
const createCelebrities = async () => {
    try {
      await Celebrity.create({
        name: "Tom Cruise",
        occupation: "Actor",
        catchPhrase: "I feel the need... the need for speed.",
      });
  
      await Celebrity.create({
        name: "Beyonce",
        occupation: "Singer",
        catchPhrase: "Who run the world? Girls!",
      });
  
      await Celebrity.create({
        name: "Daffy Duck",
        occupation: "Cartoon Character",
        catchPhrase: "You're despicable!",
      });
  
      console.log("Celebrities creadas exitosamente");
    } catch (error) {
      console.error("Error al crear celebridades: ", error);
    }
  };
  createCelebrities();




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
