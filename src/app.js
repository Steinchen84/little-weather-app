// import modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// import functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //path to the templates directory
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location
app.set('view engine','hbs')//to set a handlebar --> hbs, no require necessary!
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// to render the hbs index-file
// for the home page --> leave the first argument empty!
// use res.render() to use handlebar templates
// app.get() --> route handler!
app.get('', (req, res) => {
  res.render('index', {
    title:'Weather',
    name:'Martin Hujer'
  }) 
})

app.get('/about', (req,res) => {
  res.render('about', {
    title:'About me',
    name:'Martin Hujer'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title:'Help',
    text:'This is the help page!',
    name:'Martin Hujer'
  })
})

// app.get()
// to define a path(route)
// Routes HTTP GET requests to the specified path with the specified callback functions.

app.get('/weather', (req, res) => {
  //req.query --> access to the query string!
  if(!req.query.address) {
    return res.send({
      error:'You must provide an address!'
    })
  }

  const address = req.query.address

  geocode(address, (error, { latitude, longitude, location } = {}) => {//call callback-functions with these 2 arguments --> standard!!!
    if(error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
          return res.send({ error })
        }

        res.send({
          forecast:forecastData,
          location,
          address
        })
    })
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title:'404',
    errorMessage:'No help article found!'
  })
})

// for using a 404 page --> *(wildcard)
// this app.get() has to be set up at last!!!
app.get('*', (req,res) => {
  res.render('404', {
    title:'404',
    errorMessage:'Page not found!'
  })
})

// app.listen() 
// Binds and listens for connections on the specified host and port. 
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})