const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'E. Parks',
  });
});

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'E. Parks',
  });
});

app.get("/help", (req, res) => {
  res.render('help', {
    msg: 'Help me!',
    title: 'Help',
    name: 'E. Parks',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  geoCode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
    if(error) {
      return res.send({
        error: 'There was an error with your geoCode. Try another search.',
      });
  
    }
    forecast(lattitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'There was an error with your forecast.',
        });

      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
  
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    });
  }

  res.send({products:"hey"})
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    msg: 'Help Article not found!',
  });

});

// Must be placed last,  default route will trigger after no match on all other routes.
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    msg: 'Page not found!',
    name: 'E. Parks'
  });

});

// Start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000.');

});
