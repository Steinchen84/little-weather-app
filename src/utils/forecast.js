// forecast function
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/32c90ee30e3f74f87ee9572ece0e38df/${lat},${long}`

    request({
        url,
        json: true
        // destructure the response object!
    }, (error, { body }) => {

        if(error) callback('Unable to connect!', undefined)

        else if(body.error) callback('Unable to find location!', undefined)

        else {
           
            const { temperature, precipProbability:rainProb } = body.currently
            const summary = body.daily.summary
            const tempHigh = body.daily.data[0].temperatureHigh
            const tempLow = body.daily.data[0].temperatureLow

            const message = `${summary} It has ${temperature} degrees out, whereas the lowest T is ${tempLow} degrees and the highest is ${tempHigh} degrees. There is a ${rainProb}% chance of rain.`

            callback(undefined, message)
        }
    })
}

module.exports = forecast