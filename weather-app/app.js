/**
 * access point for weather app
 *
 * NOTE: the googlemaps program they use in the book is depreciated, its
 *   a paid-only feature. Will be using Mapquest instead.
 */
/**
 * -- mapquest key & example URL
 *
 * API key: BVupnIeX6S9JeYV4HjevE8akKSKaFaye
 *
 * http://www.mapquestapi.com
 *  /geocoding/v1/address
 *  ?key=BVupnIeX6S9JeYV4HjevE8akKSKaFaye
 *  &location=1301%20lombard
 *  %20street%20philadelphia
 */
/**
 * -- dark sky (forecast.io) info
 *
 * API key: 1fd581adb94a6f609ef3e7649f328b77
 *
 * https://api.darksky.net/forecast
 *  /1fd581adb94a6f609ef3e7649f328b77
 *  /32.999587,-96.841268
 *  (^^^ is /key/latitude,longitude)
 */

/**
 * load in npm modules
 * -- remember to `$ npm init` (if this is first npm package in the
 *   project) and `$ npm install <module> --save` before we can use this
 */
//const request = require('request');   // moved to geocode/geocode.js
const yargs = require('yargs');

/**
 * load in user created modules for this project
 */
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

/** take the input from process variable, parse through yargs... */
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather conditions for',
            string: true  /** always parse passed in argument as a string */
        }
    })
    .help()     /** add a help method with an alias */
    .alias('help', 'h')
    .argv;      /** ...run the arguments through proceeding options & store it here */


/**
 * logic to be migrated, to abstract complex logic for data encoding, making
 *   the HTTP request, error checking - app.js doesn't need to know any of
 *   that, doesn't even need to know that an HTTP request was even made
 *
 * app.js should be responsible solely for passing an address to a function and
 *   doing something with the result
 */
//
//  /** grab provided address, encode it into URI-safe string */
//  var encodedAddress = encodeURIComponent(argv.address);  /** or, encodeURIComponent(argv.a) */
//  const pubAPIkey = 'BVupnIeX6S9JeYV4HjevE8akKSKaFaye';
//  //console.log(argv);
//
//
//  /** make a (HTTP) request ( request(options{}, callbackFunction(request's args)); ) */
//  request({
//      /** option 1, URL */
//      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${pubAPIkey}&location=${encodedAddress}`,
//      /** option 2, "yes, the returned data will be JSON, please unstringify into an object" */
//      json: true
//  }, (error, response, body) => {
//      /*----------  callback function, fires when data received  ----------*/
//      /**
//       * -- error: server-side errors related to HTTP request
//       * -- response: object of data for response & request, includes:
//       *     HTTP response codes,
//       *     another copy of body,
//       *     information about what we're requesting,
//       *     headers sent to API (json: true = "application/json") & headers received back
//       * -- body: main data received
//       *
//       * NOTE IN REGARDS TO body:
//       * body is not unique to the request module
//       * body is part of HTTP, the core data that comes back from a server
//       *
//       * every time you make a request to a website, the data that returns is the body
//       *   of the request (ex: request a URL in the browser, what gets rendered on the
//       *   screen is the body)
//       *
//       *  body could be anything from HTML webpage to JSON from our API requests
//       */
//      if (error) {
//          console.log(error);  // book: "unable to connect to google servers"
//          //debugger;
//      } else if (body.info.statuscode == '400') {
//          console.log(body.info.messages[0]);  // book: "unable to find that address"
//          //debugger;
//      } else if (body.info.statuscode == '0') {
//          /*----------  normal response  ----------*/
//          //console.log(body);
            /** an array 'results' of objects containing other objects */
            /** NOTE: compare results array, holds a single object with two properties */
            /*
            { info:
              { statuscode: 0,
                copyright:
                  { text: '© 2018 MapQuest, Inc.',
                    imageUrl: 'http://api.mqcdn.com/res/mqlogo.gif',
                    imageAltText: '© 2018 MapQuest, Inc.' },
                messages: [] },
            options: { maxResults: -1, thumbMaps: true, ignoreLatLngInput: false },
            results: [ { providedLocation: [Object], locations: [Array] } ] }
            */
//
//          /*----------  mapquest version of the book's code  ----------*/
//          //console.log('results: ', response.body.results[0]);
            /** accessing the results array and the 1st (and only) object on it */
            /*
            results:  {
                providedLocation: { location: '1301 lombard street philadelphia' },
                locations: [ {
                    street: '1301 Lombard St',
                    adminArea6: '',
                    adminArea6Type: 'Neighborhood',
                    adminArea5: 'Philadelphia',
                    adminArea5Type: 'City',
                    adminArea4: 'Philadelphia',
                    adminArea4Type: 'County',
                    adminArea3: 'PA',
                    adminArea3Type: 'State',
                    adminArea1: 'US',
                    adminArea1Type: 'Country',
                    postalCode: '19147-1003',
                    geocodeQualityCode: 'L1ABA',
                    geocodeQuality: 'ADDRESS',
                    dragPoint: false,
                    sideOfStreet: 'R',
                    linkId: 'rnr5506315|i48372271',
                    unknownInput: '',
                    type: 's',
                    latLng: [Object],
                    displayLatLng: [Object],
                    mapUrl: '<omitted for length>' } ]
            }
            */
//
//          /*----------  attempting to pretty-print the objects  ----------*/
//          //console.log('request.body, stringified:', JSON.stringify(body, undefined, 2));
            /** JSON.stringify(<object to stringify>, <"no, don't apply filters">, <indentation spaces>) */
            /*
            STRING version of results: {
              "info": {
                "statuscode": 0,
                "copyright": {
                  "text": "© 2018 MapQuest, Inc.",
                  "imageUrl": "http://api.mqcdn.com/res/mqlogo.gif",
                  "imageAltText": "© 2018 MapQuest, Inc."
                },
                "messages": []
              },
              "options": {
                "maxResults": -1,
                "thumbMaps": true,
                "ignoreLatLngInput": false
              },
              "results": [
                {
                  "providedLocation": {
                    "location": "1301 lombard street philadelphia"
                  },
                  "locations": [
                    {
                      "street": "1301 Lombard St",
                      "adminArea6": "",
                      "adminArea6Type": "Neighborhood",
                      "adminArea5": "Philadelphia",
                      "adminArea5Type": "City",
                      "adminArea4": "Philadelphia",
                      "adminArea4Type": "County",
                      "adminArea3": "PA",
                      "adminArea3Type": "State",
                      "adminArea1": "US",
                      "adminArea1Type": "Country",
                      "postalCode": "19147-1003",
                      "geocodeQualityCode": "L1ABA",
                      "geocodeQuality": "ADDRESS",
                      "dragPoint": false,
                      "sideOfStreet": "R",
                      "linkId": "rnr5506315|i48372271",
                      "unknownInput": "",
                      "type": "s",
                      "latLng": {
                        "lat": 39.944401,
                        "lng": -75.163136
                      },
                      "displayLatLng": {
                        "lat": 39.944599,
                        "lng": -75.16311
                      },
                      "mapUrl": "<omitted for length>"
                    }
                  ]
                }
              ]
            }
            */
//
//          /*----------  accessing specific property  ----------*/
//          var locations = body.results[0].locations[0];
//          var street = locations.street;
//          var city = locations.adminArea5;
//          var state = locations.adminArea3;
//          var zip = locations.postalCode;
//          //console.log(body.info.statuscode);
//          //debugger;
//          console.log(`Location: ${street} ${city} ${state}, ${zip}`);
//          console.log(`Latitude: ${locations.latLng.lat}`);
//          console.log(`Longitude: ${locations.latLng.lng}`);
//      }
//  });


/** replace all that logic with this... */
//geocode.geocodeAddress(argv.address);
/** ...and even ^^ that ^^ will get refactored to use a callback function */


/**
 * we'll pass an arrow function to geocodeAddress to be called after the
 *   request comes back
 *
 * the arrow function will expect two arguments, errorMessage string and
 *   results object, and only one will be available at any one time
 *
 */       /** callback function --> |----------------------------| <--fired upon data retrieval or error */
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(`Error, ${errorMessage}`);
    } else {
        /**
         * use 'stringify(x, y, z)' to pretty-print results object parameter
         * -- x: the object you want parsed into JSON formatted string
         * -- y: option to filter data in the supplied object, undefined if no filters needed
         * -- z: the number of spaces to indent each appropriate line
         */
        //console.log( JSON.stringify(results, undefined, 4) );
        /** formatted address from geocode.js */
        console.log(results.address);

        /** chain another callback to this callback */
        //weather.getWeather(32.999587, -96.841268, (errorMessage, weatherResults) => {
        weather.getWeather(results.latitude, results.longitude,
            (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                //console.log(JSON.stringify(weatherResults, undefined, 4));
                console.log(`The temp is ${weatherResults.temperature} but feels like ${weatherResults.actualTemp}`);
            }
        });
    }
} /* <-- closure of the callback **/ /** closure of geocodeAddress call --> */ );


