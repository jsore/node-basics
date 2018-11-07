/**
 * logic behind getting location and weather info
 * -- use this as an example of 'callbacks in asynchronous programming'
 * -- instead of returning data, call a callback function passing data in the call
 * -- open HTTP request to mapquest API
 * -- send back to calling function via callbacks: error msg || obj of formatted address, lat and lng
 * -- set exports to allow geocodeAddress to be used in any file geocode.js require()'ed in
 */

/*----------  npm module(s)  ----------*/
const request = require('request');

/*----------  function wrapper for logic behind app.js  ----------*/
var geocodeAddress = (address, callback) => {
    /**
     * -- address param is currently plaintext unencoded address
     * -- encode address into a URI-safe string:
     */
    var encodedAddress = encodeURIComponent(address);  /** NOTE: no argv access */
    const mapquestAPI = 'BVupnIeX6S9JeYV4HjevE8akKSKaFaye';

    /** open new HTTP connection with two options and a callback to fire after data retrieved */
    request({
        /*----------  options  ----------*/
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mapquestAPI}&location=${encodedAddress}`,
        //https://api.darksky.net/forecast/1fd581adb94a6f609ef3e7649f328b77/32.999587,-96.841268
        json: true
    }, (error, response, body) => {
        /*----------  callback  ----------*/
        if (error) {
            /*----------  if endpoint server error  ----------*/

            //console.log(error);
            /** replace ^^ with callback call for funsies */
            callback(`unable to connect, error: ${error}`);

        } else if (body.info.statuscode == '400') {
            /*----------  else if error with submitted data  ----------*/

            //console.log(body.info.messages[0]);
            /** replace ^^ with callback call for funsies */
            callback(`problem with addres: ${body.info.messages[0]}`);

        } else if (body.info.statuscode == '0') {
            /*----------  else if any location data at all retrieved  ----------*/

            /** else if-scoped globals */
            var locations = body.results[0].locations[0];
            var street = locations.street;
            var city = locations.adminArea5;
            var state = locations.adminArea3;
            var zip = locations.postalCode;
            var fullAddressString = `${street} ${city} ${state}, ${zip}`;

            /*----------  v1  ----------*/
            //console.log(body);
            //console.log('results: ', response.body.results[0]);
            //console.log('request.body, stringified:', JSON.stringify(body, undefined, 2));
            /*----------  v1  ----------*/

            /*----------  v2  ----------*/
            //console.log(body.info.statuscode);
            //console.log(`Location: ${street} ${city} ${state}, ${zip}`);
            //console.log(`Latitude: ${locations.latLng.lat}`);
            //console.log(`Longitude: ${locations.latLng.lng}`);
            /*----------  v2  ----------*/

            /*----------  v3  ----------*/
            /** appJScallbackArrowFunc(errorMessage, resultsObj{}) */
            callback(undefined, {
                address: fullAddressString,
                latitude: locations.latLng.lat,
                longitude: locations.latLng.lng
            });
            /*----------  v3  ----------*/
        }
    });
};

/*----------  exports for every file that requires() this file  ----------*/
module.exports.geocodeAddress = geocodeAddress;
