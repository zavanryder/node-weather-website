const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/f69d854ba5f1f96944240fd1d7a3a61d/' + lat + ',' + lon
    request({ url, json: true}, (error,{ body }) => {
        if (error){
            callback("Unable to connect to weather service.  I guess it's fucked up.", undefined)
        } else if (body.error) {
            callback('Unable to find location, asshole.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + '  Hey asshole, it is currently ' + body.currently.temperature 
            + ' degrees with ' + body.currently.precipProbability + '% chance of fuckin rain.')
        }
    })
}

module.exports = forecast