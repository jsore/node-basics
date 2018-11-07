/**
 * /var/www/nodeJS/exercises/notesApp-node/playground/arrow-functions.js
 * -- using arrow functions vs normal function syntax
 */



/**
 * summary: use the new ES6 method definition ability to define
 *   regular functions on objects (methods) instead of arrow funcs
 */



/*----------  simple arrow examples  ----------*/

/** statement arrow function */
var square = (x) => {
    var result = x * x;
    return result;
};
console.log(square(9));  // 81

/**
 * expression arrow function
 * specify an expression you want returned, on a single line and
 *   using a single statement
 */
var square2 = (x) => x * x;
console.log(square2(9));  // 81

/**
 * expression arrow function
 * also valid, if you're using a single argument you can remove the ()
 */
var square3 = x => x * x;
console.log(square3(9));  // 81



/*----------  no 'this' bindings in arrow functions  ----------*/

var user = {
    name: 'Andrew',
    sayHi: () => {          /** this is fine, no real diferentiation between regular/arrow */
        console.log(`Hi`);
    }
};
user.sayHi();  // Hi

var user2 = {
    name: 'Andrew',
    sayHi: () => {                          /** but this won't work, arrow functions have no 'this' bindings */
        console.log(`Hi I'm ${this.name}`); /** 'this' binding would be to global object in a normal function */
    }
};
user2.sayHi();  // Hi I'm undefined

var user3 = {
    name: 'Andrew',
    sayHi: () => {                          /** ES6 provides a new way of defining methods */
        console.log(`Hi I'm ${this.name}`); /** ...this 'this' still won't work... */
    },
    newES6method() {                        /** <-- is a regular function, but without 'function' declaration */
        console.log(`Hi I'm ${this.name}`); /** ...but this 'this' will */
    }
};
user3.newES6method();  // Hi I'm Andrew



/*----------  no arguments binding in arrow functions  ----------*/

/**
 * normal functions have access to the arguments array, but arrow
 *   functions don't have access to the 'arguments' keyword at all,
 *   if you try to use it you'll see the arguments for the global
 *   wrapper function (ie: DOM or window object)
 */
var user4 = {
    name: 'Andrew',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi I'm ${this.name}`);
    },
    newES6method() {
        console.log(arguments);
        console.log(`Hi I'm ${this.name}`);
    }
};
user4.newES6method(1, 2, 3);
    // $ node playground/arrow-functions.js
    // >> { '0': 1, '1': 2, '2': 3 }
    // >> Hi I'm Andrew
user4.sayHi(1, 2, 3);
    // $ node playground/arrow-functions.js
    // >> { '0': {},
    // >>   '1':
    // >>    { [Function: require]
    // >>      resolve: { [Function: resolve] paths: [Function: paths] },
    // >>      main:
    // >>       Module {
    // >>         id: '.',
    // >>         exports: {},
    // >>         parent: null,
    // >>         filename: '/var/www/nodeJS/exercises/notesApp-node/playground/arrow-functions.js',
    // >>         loaded: false,
    // >>         children: [],
    // >>         paths: [Array] },
    // >>      extensions: { '.js': [Function], '.json': [Function], '.node': [Function] },
    // >>      cache:
    // >>       { '/var/www/nodeJS/exercises/notesApp-node/playground/arrow-functions.js': [Object] } },
    // >>   '2':
    // >>    Module {
    // >>      id: '.',
    // >>      exports: {},
    // >>      parent: null,
    // >>      filename: '/var/www/nodeJS/exercises/notesApp-node/playground/arrow-functions.js',
    // >>      loaded: false,
    // >>      children: [],
    // >>      paths:
    // >>       [ '/var/www/nodeJS/exercises/notesApp-node/playground/node_modules',
    // >>         '/var/www/nodeJS/exercises/notesApp-node/node_modules',
    // >>         '/var/www/nodeJS/exercises/node_modules',
    // >>         '/var/www/nodeJS/node_modules',
    // >>         '/var/www/node_modules',
    // >>         '/var/node_modules',
    // >>         '/node_modules' ] },
    // >>   '3': '/var/www/nodeJS/exercises/notesApp-node/playground/arrow-functions.js',
    // >>   '4': '/var/www/nodeJS/exercises/notesApp-node/playground' }
    // >> Hi I'm undefined