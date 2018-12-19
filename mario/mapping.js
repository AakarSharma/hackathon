canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 240;
canvas.height = 300;

var mydata = JSON.parse(data);
console.log(mydata);
document.addEventListener("keydown", keyNavigationdown, true);
document.addEventListener("keyup", keyNavigationup, true);

function keyNavigationup(e) {
    e.stopPropagation();
    for (var prop in mydata) {
        if (e.key == mydata[prop]) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
            keyboardEvent[initMethod](
                "keyup", // event type : keydown, keyup, keypress
                true, // bubbles
                true, // cancelable
                window, // viewArg: should be window
                false, // ctrlKeyArg
                false, // altKeyArg
                false, // shiftKeyArg
                false, // metaKeyArg
                prop, // keyCodeArg : unsigned long the virtual key code, else 0
                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);

        }
    }
}

function keyNavigationdown(e) {
    console.log(e);
    e.stopPropagation();
    for (var prop in mydata) {
        if (e.key == mydata[prop]) {
            var keyboardEvent = document.createEvent("KeyboardEvent");
            var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
            keyboardEvent[initMethod](
                "keydown", // event type : keydown, keyup, keypress
                true, // bubbles
                true, // cancelable
                window, // viewArg: should be window
                false, // ctrlKeyArg
                false, // altKeyArg
                false, // shiftKeyArg
                false, // metaKeyArg
                prop, // keyCodeArg : unsigned long the virtual key code, else 0
                0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);
        }
    }
if (e.key == "Backspace") {
        // Handle if you want to go to previous menu or to exit directly;
        e.preventDefault(); // to prevent app from exiting
        let exit = confirm("Are your sure want to exit");
        if (exit) {
            window.close();
        }
    }
    if (e.key == "Backspace") {
        // Handle if you want to go to previous menu or to exit directly;
        e.preventDefault(); // to prevent app from exiting
        let exit = confirm("Are your sure want to exit");
        if (true) {
            window.close();
        }
    }
}
