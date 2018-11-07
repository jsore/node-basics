//https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/32.999587,-96.841268

const request = require('request');
request({
    url: 'https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/32.999587,-96.841268',
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log('Unable to fetch weather');
    }
});