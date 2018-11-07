/**
 * /var/www/nodeJS/exercises/notesApp-node/note.js
 *
 * -- functionality to read/write notes
 * -- NOTE: book suggests name notes.js >> note.js
 */

/** file tracking statement */
//console.log('Starting ./note.js');


/*----------  v1  ----------*/
/**
 * exports{} object
 * -- part of the module{} method
 * -- available in all Node files
 * -- all exports get set to the variable referencing this file
 */
/** simple example, a static number */
//module.exports.age = 25;

/** much more common, exporting actual functionality */
/** ES5 syntax: */
//module.exports.something = function () {
//    // do something
//};
/** ES6 syntax, arrow function */
//module.exports.addNote = () => {
    /**
     * NOTE: arrow functions do not bind the () ==> {} keyword
     *   or arguments array, which could cause issues and errors
     */

    /** tracking statement */
    //console.log('Starting note.js addNote()');

    //return 'New note';
//};

/** ES6 arrow function with arguments */
// module.exports.addNumbers = (a, b) => {
//     return a + b;
// };
/*----------  v1  ----------*/


/*----------  v2  ----------*/
const fs = require('fs');

/**
 * -- attempt to add a note
 * -- if the note gets added, return the added note
 */
var addNote = (title, body) => {        /*----------  add  ----------*/
    console.log('----');
    console.log('Adding note...');
    /** all the notes, returned as an array of objects */
    var notes = fetchNotes();
    /** a singular empty note */
    var note = {
        /** remember, ES6 syntax */
        title,
        body
    };

    /**
     * we don't want to have notes with duplicate titles because
     *   some functions rely on identifying a note by its title
     * if there is a matching title, return true and keep
     *   the title in the duplicateNotes array
     * if no match found, return false and that note will
     *   not be kept in the array generated for duplicateNotes
     *   using the filter() array method
     */
    /** ES6 syntax: */
    //var duplicateNotes = notes.filter((note) => {
    //    return note.title === title;
    //});
    /**
     * also ES6 syntax, but simplified
     * if you have an arrow function with a single statement, simplify
     *   it by stripping the {} and remove the return statement, the
     *   single statement will be set to return by default
     */
    var duplicateNotes = notes.filter((note) => note.title === title);

    /** only save the new note if its title isn't duplicated */
    if (duplicateNotes.length === 0) {
        /** add the note to notes array */
        notes.push(note);
        /** call saveNotes to rebuild json file out of notes array */
        saveNotes(notes);
        /** return the note that was just added to caller (app.js) */
        return note;
    }
};

var getAll = () => {                    /*----------  list  ----------*/
    console.log('----');
    console.log('Getting all notes...');
    //return fetchNotes();
    /** setup var instead for pedantic c.log statement here */
    var retrievedNotes = fetchNotes();
    /** if true (length is 1) say note instead of notes */
    var plural = retrievedNotes.length === 1 ? 'note' : 'notes';
    console.log('----');
    console.log(`Retrieved ${retrievedNotes.length} ${plural}, printing now...`);
    return retrievedNotes;
};

var getNote = (title) => {              /*----------  read  ----------*/
    console.log('----');
    console.log('Getting note...');
    /** get and store our notes[] */
    var notes = fetchNotes();
    /**
     * return true if note title matches, keep it in the array
     * return false if no match, remove from array
     */
    var filteredNotes = notes.filter((note) => note.title === title);
    /** return the note, 1st item in filteredNotes[] or undefined */
    return filteredNotes[0];
};

var removeNote = (title) => {           /*----------  remove  ----------*/
    console.log('----');
    console.log(`Removing note \"${title}\"...`);
    /** get our notes[], store it here */
    var notes = fetchNotes();
    /**
     * filter the notes, removing the note with title matching ${title}
     * -- NOTE: array.filter() takes a function as its only argument
     * -- function = ES6 anon function, note passed as parameter
     * -- call that function with the individual item in the array
     *      currently being filter()'ed
     * -- return true if note.title != title thats passed to the function
     * -- return false if match and remove item from array
     * -- will populate filteredNotes with all items not matched
     */
    var filteredNotes = notes.filter((note) => note.title !== title);
    /** update our JSON file with the new array */
    saveNotes(filteredNotes);
    /** return true to app.js if a note was removed */
    return notes.length !== filteredNotes.length;
};

var logNoteSuccess = (note, action, boo=false) => {
    debugger;  /** see file ./playground/debugging.js */
    console.log('----');
    console.log(`Note \"${note.title}\" ${action}.`);
    console.log(`Note contents: \"${note.body}\"`);
    /** fix for formatting issue with -'s and c.logging multiple array objects */
    if (!boo) {
        console.log('----');
    };
};
var logNoteAlt = (msg) => {
    debugger;  /** see file ./playground/debugging.js */
    console.log('----');
    console.log(`${msg}.`);
    console.log('----');
};

/**
 * instead of adding properties directly onto exports,
 *   define an entire object that gets set to exports
 * Note: in ES6, you can also leave off the ': value' if
 *   the name of the property is identical to the value of
 *   that property, and is referencing a variable of the
 *   same name
 */
module.exports = {
    /** ES5: */
    //addNote: addNote
    /** ES6: */
    addNote,
    getAll,
    getNote,
    removeNote,
    logNoteSuccess,
    logNoteAlt
};

/**
 * -- fetches all notes from the filesystem
 * -- return each note as an object or an empty array
 */
var fetchNotes = () => {
    /**
     * use a try/catch block to avoid the app from crashing if the
     *   user tries to run app without first having a notes-data file
     *   or if the file contains invalid data
     */
    try {
        /** fetch current notes */
        var notesString = fs.readFileSync('notes-data.json');
        /** then build objects out of the string created by readFileSync */
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

/**
 * -- saves notes to filesystem, to json file
 * -- arg1: notes[]
 */
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
/*----------  v2  ----------*/