/**
 * /var/www/nodeJS/exercises/notesApp-node/playground/json2.js
 * -- exploring the usage of json
 */

/** fs module */
const fs = require('fs');

/** object to be read and parsed */
var originalNote = {
    title: 'Some Title',
    body: 'This is the body'
};

/** object >> string */
var originalNoteString = JSON.stringify(originalNote);

/** create file if not found, if found overwrite */
fs.writeFileSync('notes.json', originalNoteString);

/** read file from filesystem, get text content as string */
var noteString = fs.readFileSync('notes.json');

/** parse our string from the file */
var note = JSON.parse(noteString);

/** testers */
console.log(typeof note);
console.log(note.title);