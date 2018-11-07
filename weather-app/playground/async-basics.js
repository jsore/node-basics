/**
 * illustrating asynch programming
 */

/*----------  contrived example using setTimeout  ----------*/
/**
 * note: we're not telling setTimeout to wait 2 seconds
 *   we're registering an asynchronous callback to be fired
 */
/*----------  statement 1  ----------*/
console.log('Starting app');

/*----------  call 1 & statement 2  ----------*/
/** arg[0] = arrow function, arg[2] = timeout, 2 seconds */
setTimeout(() => {
    console.log('2 second timeout callback');
}, 2000);

/*----------  call 2 & statement 3  ----------*/
/** arg[0] = arrow function, arg[2] = timeout, 0 seconds */
setTimeout(() => {
    console.log('0 second timeout callback');
}, 0);

/*----------  statement 4  ----------*/
console.log('Finishing app');

/** output */
// $ node async-basics.js
// >> Starting app                  /** statement 1 */
// >> Finishing app                 /** statement 4 */
// >> 0 second timeout callback     /** statement 3 */
// >> <2 seconds pass>
// >> 2 second timeout callback     /** statement 2 */


    /*----------  what's happening here?  ----------*/
    /**
     * 4 items of note at play here:
     * -- Call Stack
     * -- Node APIs
     * -- Callback Queue
     * -- Event Loop
     */

    /**
     * The Call Stack can only run one thing at a time. But there can be other
     *   events waiting to get processed while the Call Stack executes.
     */


    console.log('Starting app');
    /**
     * We run the first c.log statement: it gets added onto the Call Stack, on
     *   top of main() - the V8 wrapper function - it finishes running, then the
     *   Call Stack removes it after its done
     *
     *   --- Call Stack ---
     *   console.log('..')
     *   main()
     */


    setTimeout(() => {
        console.log('2 second timeout callback');
    }, 2000);
    /**
     * The 1st setTimeout() is called and added to the Call Stack.
     *
     *   --- Call Stack ---
     *   setTimeout(2sec)
     *   main()
     *
     *
     * setTimeout() is a node API. When the function is called, the event/callback
     *   pair is registered in the Node APIs. The event is to wait the specified
     *   amount of time, the callback is the function we provided in arg[0]
     *
     *
     * The Call Stack executes the setTimeout, registering with the Node APIs, and
     *   removes that call from the stack
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   main()                setTimeout(2sec)
     */


    setTimeout(() => {
        console.log('0 second timeout callback');
    }, 0);
    /**
     * The next statement, another setTimeout, is reached and added to Call Stack
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   setTimeout(0sec)      setTimeout(2sec)
     *   main()
     *
     *
     * That statement is ran, which adds another register to the Node APIs, then
     *   that statement is removed from the Call Stack
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   main()                setTimeout(2sec)
     *                         setTimeout(0sec)
     *
     *
     * Once a call for a Node API is finished, it will be added to the Callback
     *   queue, its not executed right away. The Callback queue is where all
     *   callback functions go when they're ready to be fired while the Call
     *   Stack is working on emptying its stack of statements
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   main()                setTimeout(2sec)
     *
     *         ----- Callback  Queue -----
     *         setTimeout(0sec) callback
     *
     *
     * The Event Loop watches the Call Stack. Once the Call Stack is empty,
     *   the Event Loop sees if there is anything else to run.
     *
     *
     * NOTE: a callback function is, loosely, a function that gets passed as
     *   an argument to another function to be executed after some event happens
     */


    console.log('Finishing app');
    /**
     * Now we get to the 'Finishing up' c.log statement. It's added to the
     *   Call Stack, then runs.
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   console.log('..')     setTimeout(2sec)
     *   main()
     *
     *         ----- Callback  Queue -----
     *         setTimeout(0sec) callback
     *
     *
     * Once that last statement runs, its removed from the Stack. There are
     *   no more statements to run, so main() completes and the Call Stack
     *   removes it
     *
     *   --- Call Stack ---    --- Node APIs ---
     *                         setTimeout(2sec)
     *
     *         ----- Callback  Queue -----
     *         setTimeout(0sec) callback
     *
     *
     * The Event Loops tells the Call Stack it has something for it, and
     *   moves the functions its holding (right now, just the one setTimeout)
     *   to the Call Stack to execute
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   callback()            setTimeout(2sec)
     *
     *         ----- Callback  Queue -----
     *
     */


    /**
     * That callback runs and gets removed from the Call Stack. Because there's
     *   still something running (Node API event) there's still an event
     *   listener running. Eventually, the 2nd setTimeout will finish, the
     *   Node APIs remove it from their stack and moves it to the Callback
     *   Queue
     *
     *   --- Call Stack ---    --- Node APIs ---
     *
     *         ----- Callback  Queue -----
     *         setTimeout(2sec)
     *
     *
     * Event Loop then sends that to the Call Stack to execute. There's
     *   a single statement in that callback, it runs, gets removed, then
     *   the callback implicitly returns to finish its execution
     *
     *   --- Call Stack ---    --- Node APIs ---
     *   console.log('..')
     *   callback()
     *
     *         ----- Callback  Queue -----
     *
     *
     * The Event Loop keeps trying to add items to the Call Stack as long
     *   as there is an active listener awaiting for something else to end
     */



/*----------  a more real-life example  ----------*/
/**
 * fetching data from Google API for maps don't want to sit around
 *   and wait while the data comes back, we'll register a callback
 *   that will be fired once the data arrives
 */