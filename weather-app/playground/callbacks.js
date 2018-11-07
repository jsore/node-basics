/**
 * contrived example of a callback function
 *
 * a callback function is, loosely, a function that gets passed as an
 *   argument to another function to be executed after some event happens
 */

/**
 * "what happens when we pass a callback to another function?"
 * eg: simulating what it looks like to fetch a user from a DB or API
 */
var getUser = (id, callback) => {
    /**
     * params:
     * -- id, unique number representing a user
     * -- callback, what we're calling with the 1st param
     */

    /** dummy object, to be replaced with DB queries */
    var user = {
        /** equal to id passed in to callback */
        id: id,
        /** dummy data */
        name: 'Vikram'
    };

    /**
     * call the callback, passing it as an argument and sending user data
     *
     * NOTE: this is a contrived example, a callback isn't really required,
     *   the callback could be replaced with a simple return (but then we
     *   wouldn't be using a callback - this is a demonstration of how
     *   we actually call the function that gets passed in as an argument)
     *
     * use setTimeout to simulate a wait for data retreival
     */
    setTimeout(() => {  callback(user);  }, 3000);
};

/** call to be callback'ed */
getUser(31, (userObj) => {
    /**
     * params:
     * -- 31 (id)
     * -- user, data expected to come back as argument to callback
     * -- arrow function, do something with the user data
     */
    console.log(userObj);  // { id: 31, name: 'Vikram' }
});
