const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars (hbs) engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory for server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather fuckin app',
        name: 'Yo Fuckin Mama'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me Mofo',
        name: 'Yo Fuckin Mama, Again'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'HERE IS MY MESSAGE.  FUCK OFF. AND HELP.',
        title: 'HELP',
        name: 'Yo Fuckin Mama, Again'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provice an address to get a forecast, idiot.'
        })
        
    }
    console.log(req.query)
    geocode(req.query.address, (error, { lat, lon, place } = {}) => {
        if (error){
            return res.send({ error })
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                location: place,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        areaMessage: 'NO HELP PAGE FOUND, IDIOT!',
        title: 'HELP ME!',
        name: 'Yo Fuckin Mama, Again'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        areaMessage: 'PAGE NOT FOUND, MORON!',
        title: 'HELP ME!',
        name: 'Yo Fuckin Mama, Again'
    })
})

app.listen(3000, () => {
    console.log('Shit started right on 3000.')
})