/**
 * /var/www/nodeJS/exercises/notesApp-node/playground/debugging.js
 *
 * -- basics of debugging in node
 */

var person = {
    name: "Justin"
};
person.age = 27;
/**
 * instead of going through a program statement by statement
 *   using n, stick a debugger keyword where you want Node
 *   to stop 'continue'ing through the program
 */
debugger;
person.name = 'Mike';
console.log(person);

/**
 * debugging in node, must first open node in inspect mode
 *
 *  root /var/www/nodeJS/exercises/notesApp-node/playground
 *  # node inspect debugging.js
 *  >> < Debugger listening on ws://127.0.0.1:9229/5218c5b0-14be-4844-baa5-6884bd9780fe
 *  >> < For help see https://nodejs.org/en/docs/inspector
 *  >> < Debugger attached.
 *  >> Break on start in debugging.js:1
 *  >> > 1 (function (exports, require, module, __filename, __dirname) { /**
 *  >>   2  * /var/www/nodeJS/exercises/notesApp-node/playground/debugging.js
 *  >>   3  *
 *  debug>

 * commands available to debug>
 *  n: next (move to the next statement and execute current statement)
 *  c: continue (run through to program end or debugger keyword)
 *  repl: Read Evaluate Print Loop (run node commands and JS)
 *      example: run through statements until line 11
 *          debug> n
 *          >> break in debugging.js:11
 *          >>   9 };
 *          >>  10 person.age = 27;
 *          >> >11 person.name = 'Mike';            // <-- this line hasn't executed yet
 *          >>  12 console.log(person);
 *          >>  13
 *          debug> repl                             // <-- enter repl mode
 *          >> Press Ctrl + C to leave debug repl
 *          > person                                // <-- this is the command I typed after repl
 *          >> { name: 'Justin', age: 27 }          //   displays the person object as it is currently
 *          > person.name                           //   because line 11 hasn't ran yet, name should still be Justin
 *          >> 'Justin'
 *          > typeof person
 *          >> 'object'
 *          > CTRL C to exit
 *          debug>
 *
 */