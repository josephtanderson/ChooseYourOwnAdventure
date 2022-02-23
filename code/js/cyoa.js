//022222

const stylesheet = document.styleSheets[0];
const globalStyle = stylesheet.cssRules[1].style;
const settings = document.getElementById("hide-settings");
const settingsBtn = document.getElementById("settings-btn");
const settingsMenuBtn = document.getElementById("settings-menu-btn");
const menuStyle = stylesheet.cssRules[6].style;
var menuHidden = true;
const fsToggleBtn = document.getElementById("fullscreen-setting-toggle");
const taToggleBtn = document.getElementById("typeanimations-setting-toggle");
const tgToggleBtn = document.getElementById("textglow-setting-toggle");
var textAnimations = false;
var textGlow = true;
const fsToggleBtnStyle = stylesheet.cssRules[16].style;
const taToggleBtnStyle = stylesheet.cssRules[17].style;
const tgToggleBtnStyle = stylesheet.cssRules[18].style;
const screenSizeStyle = stylesheet.cssRules[4].style;
const screenBorder = stylesheet.cssRules[3].style;
//screen sizing
var currentWidth = screenSizeStyle.width;
var currentHeight = screenSizeStyle.height;
var currentFontSize = globalStyle.fontSize;
var viewMin;

if (fullscreen){
    fullscreenOn();
} else {
    fullscreenOff()
}
screenSizing();

var fullscreen = false;

function screenSizing() {
    if (window.visualViewport['width'] < window.visualViewport['height']) {
        viewMin = window.visualViewport['width'];
    } else {
        viewMin = window.visualViewport['height'];
    }
    if (viewMin > 1400){
        currentFontSize = "32px"
        currentWidth = "1391px";
        currentHeight = "1192px";
        fullscreen= false;
    } else if (viewMin >= 800) {
        currentFontSize = "16px"
        currentWidth = "724px"
        currentHeight = "620px";
        fullscreen= false;
    } else if (viewMin >= 450) {
        currentFontSize = "12px"
        currentWidth = "554px"
        currentHeight = "476px";
        fullscreen= false;
    } else if (viewMin < 450){
        currentFontSize = "8px"
        currentWidth = "385px";
        currentHeight = "330px";
        fullscreen= true;
    }
    if (fullscreen){
        fullscreenOn();
    } else {
        fullscreenOff()
    }
}
function fullscreenOn() {
    toggleBtn(fsToggleBtnStyle, fullscreen);
    screenSizeStyle.width = "100vw";
    screenSizeStyle.height = "100vh";
    screenSizeStyle.borderStyle = "none";
    screenSizeStyle.margin = "0"
    screenSizeStyle.padding = "20px";
    screenBorder.borderStyle = "none";
    globalStyle.fontSize = "16px";
}
function fullscreenOff() {
    toggleBtn(fsToggleBtnStyle, fullscreen);
    screenSizeStyle.width = currentWidth;
    screenSizeStyle.height = currentHeight;
    screenSizeStyle.borderStyle = "solid";
    screenSizeStyle.margin = "0"
    screenSizeStyle.padding = "6px 10px 5px";
    screenBorder.borderStyle = "solid";
    globalStyle.fontSize = currentFontSize;
}

window.visualViewport.addEventListener('resize', screenSizing)

//menu toggling
function menuToggle () {
    if (menuHidden === true) {
    menuStyle.visibility="visible";
    menuHidden=false;
} else if (menuHidden === false) {
    menuStyle.visibility="hidden";
    menuHidden=true;
    }
}
settingsBtn.addEventListener('click', menuToggle);
settingsMenuBtn.addEventListener('click', menuToggle);

function toggleBtn (button, state) {
    if (state) {
        button.backgroundColor="rgb(27, 161, 34)";
        button.paddingLeft="15px";
    } else {
        button.backgroundColor="rgb(254, 93, 38)";
        button.paddingLeft="2px";
    }
}

function fsBtnToggle() {
    if (fullscreen) {
        fullscreen = false;
        fullscreenOff();
    } else {
        fullscreen = true;
        fullscreenOn();
    }
}
function taBtnToggle() {
    if (textAnimations) {
        //if on turn off
        textAnimations = false;
        toggleBtn(taToggleBtnStyle, textAnimations);
    } else {
        //if off turn on
        textAnimations = true;
        toggleBtn(taToggleBtnStyle, textAnimations);
    }
}
function tgBtnToggle() {
    if (textGlow) {
        //if on turn off
        textGlow = false;
        toggleBtn(tgToggleBtnStyle, textGlow);
        globalStyle.textShadow = "none";
    } else {
        //if off turn on
        textGlow = true;
        toggleBtn(tgToggleBtnStyle, textGlow);
        globalStyle.textShadow = "var(--text-glow)";
    }
}
fsToggleBtn.addEventListener('click', fsBtnToggle);
// taToggleBtn.addEventListener('click', taBtnToggle);
tgToggleBtn.addEventListener('click', tgBtnToggle);


//----------------------------------------------------------//


const gameText = document.getElementById("text-log");
const form = document.getElementById('form');
const input = document.getElementById("player-input");

var response;
var globalCommand = false;
const dialogArr = [["You have a previously saved game, would you like to continue?\r\n'yes' or 'no'"],
/*1*/   ['You wake up in a strange place...', 
        /*1*/   'You see a light in the distance, and a massive metal door to your left.',
        /*2*/   'Do you try the door, or head for the light?'],
/*2*/   ["Do you want to go back?"],
/*3*/   ["You head toward the light, and find a key!",
        /*1*/   "Pretty cool!",
        /*2*/   "Maybe try the door again?",
        /*3*/   "Unless you want to explore some more?"],
/*4*/   ["It is a MASSIVE METAL door,",
        /*1*/   "it is very securely locked and will not budge,",
        /*2*/   "if only you had a key...",
        /*3*/   "Do you head for the light, or try the door, again?"],
/*5*/   ["You quickly stash the key and take in your surroundings.",
        /*1*/   "You see that you are in a what appears to be a medieval dungeon.",
        /*2*/   "Which is weird because it's 2022.",
        /*3*/   "Anyway, there seems to be a stairway leading to the rest of the 'castle'?",
        /*4*/   "You also could climb to the window and see out. Maybe you'll recognize the landscape?"],
/*6*/   [],
/*7*/   [],
/*8*/   [],
/*9*/   [],
/*0*/   [],
/*11*/  [],
/*12*/  ["True Ending?"],
/*13*/  ["You Win?", "Sure, but you didn't really learn anything,", "Like, why you were there, or any secrets, oh well."]
];

const optionArr1 = [ 'yes',
/*1*/   "door",
/*2*/   "no",
/*3*/   "explore", 
/*4*/   "light", 
/*5*/   "stairway", 
/*6*/   "", 
/*7*/   "", 
/*8*/   "",
/*9*/   "",
/*10*/  "",
/*11*/  "",
/*12*/  "",
/*13*/  ""
];

const optionArr2 = [ 'no',
/*1*/   "light",
/*2*/   "yes", 
/*3*/   "door", 
/*4*/   "door", 
/*5*/   "window", 
/*6*/   "",
/*7*/   "",
/*8*/   "",
/*9*/   "",
/*10*/  "",
/*11*/  "",
/*12*/  "",
/*13*/  ""
];

//x= [option1, option 2]
const newDoorArr = [ [localStorage.getItem('progress'), 1],
/*1*/   [4,3], 
/*2*/   [], 
/*3*/   [5,13], 
/*4*/   [3,4], 
/*5*/   [5,5], 
/*6*/   "", 
/*7*/   [], 
/*8*/   "", 
/*9*/   "", 
/*10*/  "", 
/*11*/  "", 
/*12*/  [12,12], 
/*13*/  [13,13]
];

const globalCommandArr = ["testmode",
/*1*/   "exit",
/*2*/   "reset",
/*3*/   "save",
/*4*/   "settings",
/*5*/   "help",
/*6*/   "_",
/*7*/   "_",
/*8*/   "_",
/*9*/   "_",
/*10*/   "_",
/*11*/   "_",
/*12*/   "_"
];

const globalRespArr = [ "1________1_________2_________3_________412________1_________2_________3_________413________1_________2_________3_________414________1_________2_________3_________415________1_________2_________3_________416________1_________2_________3_________417________1_________2_________3_________418________1_________2_________3_________419________1_________2_________3_________4110_______1_________2_________3_________4111_______1_________2_________3_________4112_______1_________2_________3_________4113_______1_________2_________3_________4114_______1_________2_________3_________4115_______1_________2_________3_________4116_______1_________2_________3_________4117_______1_________2_________3_________4118_______1_________2_________3_________4119_______1_________2_________3_________4120_______1_________2_________3_________4121_______1_________2_________3_________4122_______1_________2_________3_________4123_______1_________2_________3_________4124_______1_________2_________3_________4125_______1_________2_________3_________4126_______1_________2_________3_________4127_______1_________2_________3_________4128_______1_________2_________3_________4129_______1_________2_________3_________41", 
/*1*/    "Are you sure you want to exit? \r\n'yes' or 'no'",
/*2*/    "Do you want to reset? \r\n(This will remove your saved data) \r\n'yes' or 'no'",
/*3*/    "Save your Game?\r\n'yes' or 'no'", 
/*4*/    "Open the settings menu? \r\n'yes' or 'no'",
/*5*/    "Global Commands: \r\n exit  \r\n reset \r\n save \r\n settings \r\n help\r\n",
/*6*/    "",
/*7*/    "",
/*8*/    "",
/*9*/    "",
/*10*/   "",
/*11*/   "",
/*12*/   "",
];

let gamePrint = "";
let newLine = "";
const inventoryArr = [];
var x;
var back;

if (localStorage.getItem('progress')) {
    x = 0;
    inventoryArr.push(localStorage.getItem('inventory'))
} else {
    x = 1;
} 
var playerInput ="";

function print(textToPrint){
    gamePrint = gamePrint /*+ "\r\n" */+ textToPrint + "\r\n";
    gameText.textContent = gamePrint;
    input.value= ""; 
}

function roomText(x){
    for (y=0; y<dialogArr[x].length; y++) {
    print(dialogArr[x][y]);
    }
}

function findCommand(input){
    inputTest = input.toLowerCase();
    inputTest = inputTest.split(" ");
    playerInput = "input not recognized";
    for (i = 0 ; i <inputTest.length; i++) {
        if (globalCommand !== false) {
            if (inputTest[i] === "yes") {
                playerInput = "yes";
            } else if (inputTest[i] === "no") {
                playerInput = "no";
            } else {
            }
        }
        if (globalCommandArr.includes(inputTest[i])) {
            globalCommand = globalCommandArr.indexOf(inputTest[i]);
            response = globalRespArr[globalCommand];
            print(response);
            playerInput = inputTest[i];
        } else if (optionArr1[x] === inputTest[i]) {
            playerInput = inputTest[i];
        } else if (optionArr2[x] === inputTest[i]) {
            playerInput = inputTest[i];
        } else if (inputTest[i] === "back") {
            playerInput = "back";
        } else {

        }
    }
    if (playerInput === "input not recognized"){
        globalCommand = false;
    }
    else {
    }
}

roomText(x);

function playerSubmission(event) {
    playerInput = input.value;
    if (playerInput) {
        print("\r\n" + playerInput + "\r\n");
        findCommand(playerInput);

    //global commands--
        if (globalCommand !== false) {
            if (globalCommand === 3 && localStorage.getItem('progress')) {
                response = "This will overwrite previous save." + response;
            }
            if (globalCommand === 0) {
                //continue
                if (playerInput === "yes") {

                    
                } else if (playerInput === "no") {
                    gamePrint= "";
                    x = 1;
                } else {
                    response = "I didn't understand your input please try again.";
                }
                
            } else if (globalCommand === 1) {
                //exit
                if (playerInput === "yes") {
                    response = "Well we can't do that yet...";
                    print(response  + "\r\n");
                } else if (playerInput === "no") {
                } else {
                    response = "I didn't understand your input please try again.";
                }
                
            } else if (globalCommand === 2 && !localStorage.getItem('progress')) {
                location.reload()
                x = 1;
            } else if (globalCommand === 2) {
                //reset
                if (playerInput === "yes") {
                    localStorage.removeItem('progress');
                    localStorage.removeItem('inventory');
                    response= "Save data reset";
                    print(response);
                } else if (playerInput === "no") {
                    gamePrint = "";
                } else {
                    response = "I didn't understand your input please try again.";
                }
                
            } else if (globalCommand === 3) {
                //save
                if (playerInput === "yes") {
                    localStorage.setItem('progress', x);
                    localStorage.setItem('inventory', inventoryArr);
                    response = "Game Saved";
                    print(response);
                } else if (playerInput === "no") {
                } else {
                    response = "I didn't understand your input please try again.";
                }
                
            } else if (globalCommand === 4) {
                //settings
                if (playerInput === "yes") {
                    menuToggle();
                } else if (playerInput === "no") {
                } else {
                    response = "I didn't understand your input please try again. \r\n";
                }
                
            } else if (globalCommand === 5) {

            } else if (globalCommand === 6) {
                //testMode
                if (parseInt(playerInput) !== NaN) {
                    mode = parseInt(playerInput);
                    gamePrint = "";
                } else {
                    gamePrint = "";
                }
                
            } else {
                response = "I didn't understand your input please try again. \r\n";
            }
            } else {
    //--------------------------------------------------------------------------------------------------
                if (playerInput === optionArr1[x]) {
                    x = newDoorArr[x][0];
                    roomText(x);
                    newDoorArr[2].unshift(x);
                    console.log(newDoorArr[2]);
                } else if (playerInput === optionArr2[x]) {
                    x = newDoorArr[x][1];
                    roomText(x);
                    newDoorArr[2].unshift(x);
                    console.log(newDoorArr[2]);
                } else if (playerInput === "back") {
                    x = 2;
                    roomText(x);
                    // print("feature not yet available");
                } else {
                    newLine = "I don't  understand your input, please try again \r\n";
                    print(newLine);
                }
    //--------------------------------------------------------------------------------------------------    
            }
        } else {
        response = "No input detected";
        print("\r\n"+response+"\r\n");
    }
    //--------------------------------------------------------------------------------------------------
    console.log(x);
    event.preventDefault();
}

    form.addEventListener('submit', playerSubmission);











/*                if (playerInput === optionArr1[x]) {
                    if (inventoryArr.includes("key")) {
                        x = 5;
                        newLine = "You find the door, quickly force the key into the lock and force it open with all your might";
                        print(newLineArr[x]);
                    } else {
                        x=3;
                        // newLine = "You lunge for the door, only to find it is locked, if only you had a key...";
                        print(newLineArr[x])
                        x=2
                        newLine = "Do you head for the light, or try the door, again?"
                        print(newLine);
                    }
                } else if (playerInput === optionArr2[x]) {
                    x = optionArr2.indexOf(playerInput);
                    roomText(x);
                    inventoryArr.push("key");
                    newLine = "oh cool, maybe try the door again?"
                    print(newLine);
                    x = 2; 
                } else if (playerInput === "NO INPUT"){
                    response = "No input detected";
                    print(response);
                } else {
                    newLine = "I don't  understand your input, please try again \r\n";
                    print(newLine);
                    roomText(x);
                }
*/