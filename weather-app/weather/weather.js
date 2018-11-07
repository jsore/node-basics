//https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/32.999587,-96.841268

const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        //url: 'https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/32.999587,-96.841268',
        url: `https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            //console.log(body.currently.temperature);
            callback(undefined, {
                temperature: body.currently.temperature,
                actualTemp: body.currently.apparentTemperature
            });
        } else {
            //console.log('Unable to fetch weather');
            callback('Unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;