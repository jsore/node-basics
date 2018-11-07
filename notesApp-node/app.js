/**
 * /var/www/nodeJS/exercises/notesApp-node/app.js
 *
 * -- initialization file for note taking application
 * -- this should be the only file we run in the terminal
 */

/** just a method of tracking how files are executing */
//console.log('Starting ./app.js');


/*----------  require() method 1: built in modules  ----------*/
/**
 * Filesystem module
 * -- nodejs.org/api/fs.html
 * -- allows for interaction with filesystem
 */
const fs = require('fs');

/**
 * Operating System module
 * -- https://nodejs.org/api/os.html
 * -- os info, such as logged in username
 */
//const os = require('os');


/*----------  require() method 2: 3rd party npm modules  ----------*/
/**
 * see steps for installation in notes file
 * with the 3rd party module installed, simply require it to use it here
 * be sure to reference the package's name as specificed in package.json dependencies
 */
const _ = require('lodash');  /** naming this package _ is just a common thing in Node */

/** yargs parses arguments passed in command line, alternative to raw process.argv */
const yargs = require('yargs');


/*----------  require() method 3: custom made modules (files)  ----------*/
/**
 * note.js file
 * -- relative path to app's root dir
 * -- all exports for file in require() get set here
 */
const notes = require('./note.js');
    /**
     * notes.exports =
     * { age: 25,
     *   something: function(),
     *   addNote: function(),
     *   addnumbers: function(a, b) }
     */

/**
 * set an easier to use alias for parsed object from yargs
 * the .argv module on yargs is where yargs stores its version of
 *   the arguments you run the app with
 */
//const argv = yargs.argv;
/** options for title and body arguments for yargs commands */
const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};
/** chain property calls together, call .argv on return from command() */
const argv = yargs
    /** specify a command, describe it, specify available arguments */
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    /** optional flag available to app and commands at runtime */
    .help()
    /** module where yargs stores its version of process.argv */
    .argv;

/**
 * 'process' object is synonymous with 'document' (DOM) reference
 * argv = argument vector, array of CLI args that are passed in
 *
 * //console.log(process.argv);
 * # node app.js list
 * >> [ '/usr/bin/node',                                   // exe for node
 * >>   '/var/www/nodeJS/exercises/notesApp-node/app.js',  // file that was started
 * >>   'list' ]                                           // CLI argument
 * // so, to access the argument passed when running the app:
 */
//var command = process.argv[2];
/**
 * replace the above direct reference to process.argv with yargs, at
 *   the 1st position of the _ property:
 */
var command = argv._[0];
/** now we can access the yarg-parsed argument passed in at runtime */
//console.log('Command: ', command);
/** looking at the difference between stock process.argv and yargs */
//console.log('process.argv:', process.argv);
    /**
     * # node app.js add --title "Secrets from Andrew"
     * >> process.argv: [ '/usr/local/bin/node',
     * >>   '/var/www/nodeJS/exercises/notesApp-node/app.js',
     * >>   'add',
     * >>   '--title',
     *      'Secrets from Andrew' ]
     */
//console.log('yargs:', argv);
    /**
     * # node app.js add --title "Secrets from Andrew"
     * >> yargs: {
     * >>   _: ['add'],
     * >>   title: 'Secrets from Andrew',
     * >>   '$0': 'app.js' }
     */

/**
 * four commands available for app
 * -- add       add new note        $ node app.js add --title <input> --body <input>
 * -- list      show all notes      $ node app.js list
 * -- read      show single note    $ node app.js read --title <imput>
 * -- remove    delete a note       $ node app.js remove --title <imput>
 */
if (command === 'add') {                /*----------  add  ----------*/
    /**
     * add note to JSON file & display the added note
     * or, fails with message
     */

    /** v1, call note.js to add a note */
    //notes.addNote(argv.title, argv.body);
    /**
     * v2, call note.js to attempt adding a new note and store the
     *   note that gets returned if successfull
     * if note was added, note will be an object of the returned note
     * if not, this note var will be undefined (JS returns undefined
     *   by default if no return statement gets fired)
     */
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        /** if the note was found and returned */
        notes.logNoteSuccess(note, 'added successfully');
    } else {
        /** else addNote returned undefined */
        notes.logNoteAlt('Note title taken, can not create new note');
    }
} else if (command === 'list') {        /*----------  list  ----------*/
    /**
     * show all notes in JSON file
     * or, fails with message
     */

    /** allNotes gets set to return value of getAll */
    var allNotes = notes.getAll();

    /**
     * now we need to print each note in the returned array by
     *   using forEach to call an anon arrow function as callback
     *   function for each array item (the arrow function being
     *   written in expression syntax)
     * also, all other calls to logNote functions only deal with
     *   a single note, this is the only one that logs all notes,
     *   set allBoolean to true to tell logNote that we're not
     *   sending just 1 note (to fix formatting issue with ----'s)
     */
    var allBoolean = true;
    allNotes.forEach((note) => notes.logNoteSuccess(note, 'retrieved', allBoolean));
    console.log('----');
} else if (command === 'read') {        /*----------  read  ----------*/
    /**
     * display specified note
     * or, fails with mesage
     */

    /** store note returned or undefined */
    var note = notes.getNote(argv.title);
    if (note) {
        /** if the note was found, */
        notes.logNoteSuccess(note, 'found');
    } else {
        /** else undefined returned from getNote */
        notes.logNoteAlt('Note not found');
    };
} else if (command === 'remove') {      /*----------  remove  ----------*/
    /**
     * removes the specified note
     * or, fails with message
     */
    /** will be true or false depending on success */
    var noteRemoved = notes.removeNote(argv.title);
    /** ternary (condition, ?, truthy expression, :, falsy expression) */
    var message = noteRemoved ? 'Note removed successfully' : 'Note not found';
    notes.logNoteAlt(message);
} else {
    //console.log('Command not recognized');
    notes.logNoteAlt(`Command \"${command}\" not recognized`);
}

/**
 * lodash utility isString
 * -- returns true if thing is a string
 * -- returns false if thing isn't a string
 */
//console.log(_.isString(true));  // false
//console.log(_.isString('gary'));  // true

/**
 * lodash utility uniq
 * -- take an array, return it with duplicates removed
 */
//var filteredArray = _.uniq(['name', 1, 'name', 1, 2, 3, 4]);
//var filteredArray = _.uniq(['Mike']);
//console.log(filteredArray);



/*----------  examples of using data from modules  ----------*/
/**
 * setting return statement from addNote() function to
 *  a variable, then printing it to the console
 */
//var result = notes.addNote();
//console.log(result);  // New note

/**
 * call function from note.js and pass two args
 */
//console.log('Result: ', notes.addNumbers(9, 2));


//var user = os.userInfo();
    /**
     * console.log(user);
     * { uid: 0,
     *   gid: 0,
     *   username: 'root',
     *   homedir: '/root',
     *   shell: '/bin/bash' }
     */


/** basic usage of appendFile(): */
//fs.appendFile('greetings.txt', 'Hello World!');  // Hello World!
/** concat'ing a variable: */
//fs.appendFile('greetings.txt', 'Hello' + user.username +'!');  // Helloroot!
/** using ES6 template strings (`string ${variable} more string`): */
//fs.appendFile('greetings.txt', `Hello ${user.username}!`);  // Hello root!
/** template strings and usage of exports from note.js: */
//fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);  // Hello root! You are 25.
