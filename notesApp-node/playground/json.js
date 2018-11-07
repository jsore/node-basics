/**
 * /var/www/nodeJS/exercises/notesApp-node/playground/json.js
 * -- exploring the usage of json
 */

/*----------  object >> string  ----------*/

/** define a basic object */
var obj = {
    name: 'Justin'
};

/**
 * define the string version of that object
 * the property name and value both get wrapped in double quotes ""
 * the "" is a requirement of the JSON syntax
 */
var stringObj = JSON.stringify(obj);

console.log(typeof obj);
console.log(obj);
console.log(typeof stringObj);
console.log(stringObj);


/*----------  string >> object  ----------*/

/** define some string, which is useless, to be changed >> object */
var personString = '{"name":"Andrew", "age":25}';

/**
 * this is the opposite of JSON.stringify
 * change our string back into an object and store it in this var
 */
var personObj = JSON.parse(personString);

console.log(typeof personObj);
console.log(personObj);
console.log(personString.name);     // undefined, it's a string
console.log(personObj.name);        // Andrew
