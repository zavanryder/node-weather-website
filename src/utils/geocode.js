const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemF2YW5yeWRlciIsImEiOiJjazQ3ZXowb2gwcjByM2ZueDJzdzlmYmcyIn0.eZNuy3ogr7-mQ5SaboeMHQ&limit=1'
    request({ url, json: true}, (error, { body } ) => {
        if (error){
            callback('Unable to connect to map service.  I guess it\'s fucked up.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, asshole.', undefined)
        } else {
            callback(undefined,{
                lat: body.features[0].center[1], 
                lon: body.features[0].center[0],
                place: body.features[0].place_name})
        }
    })
}

module.exports = geocode