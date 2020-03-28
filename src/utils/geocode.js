// fetching geocode data (long, lat)
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3RlaW5jaGVuMTIiLCJhIjoiY2s3dXVuZnd5MWFhMzNmb3U1Z2hweXM1NSJ9.QYgw3Z3teeEP8aaODr3Tng&limit=1`

    request({
        url,
        json: true
        // destructuring the response object!
    }, (error, { body }) => {

        if(error) callback('Unable to connect to location services', undefined)

        else if(body.features.length === 0) {
            callback('Unable to fetch data! Try again with other search terms.', undefined)
        }

        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, { latitude, longitude, location })
        }

    })  
}

// dont forget to export!
module.exports = geocode