//022022-1834

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
const dialogArr = [
    ["You have a previously saved game, would you like to continue?\r\n'yes' or 'no'"],
    ['You wake up in a strange place...', 
        'You see a light in the distance, and a door to you left.',
        'Do you head for the light, or try the door?'],
    ["You head toward the light, and find a key!"],
    [],
    [],
    [],
    ["You Win?"]
];

const globalCommandArr = [[], "exit","reset", "save", "testMode", "help"];
const globalRespArr = ["Would you like to continue?\r\n'yes' or 'no'",
    "Are you sure you want to exit? \r\n'yes' or 'no'", 
    "Do you want to reset? \r\n(This will remove your saved data) \r\n'yes' or 'no'", 
    "Save your Game?\r\n'yes' or 'no'", 
    "1________1_________2_________3_________412________1_________2_________3_________413________1_________2_________3_________414________1_________2_________3_________415________1_________2_________3_________416________1_________2_________3_________417________1_________2_________3_________418________1_________2_________3_________419________1_________2_________3_________4110_______1_________2_________3_________4111_______1_________2_________3_________4112_______1_________2_________3_________4113_______1_________2_________3_________4114_______1_________2_________3_________4115_______1_________2_________3_________4116_______1_________2_________3_________4117_______1_________2_________3_________4118_______1_________2_________3_________4119_______1_________2_________3_________4120_______1_________2_________3_________4121_______1_________2_________3_________4122_______1_________2_________3_________4123_______1_________2_________3_________4124_______1_________2_________3_________4125_______1_________2_________3_________4126_______1_________2_________3_________4127_______1_________2_________3_________4128_______1_________2_________3_________4129_______1_________2_________3_________41", 
    "Open the settings menu? \r\n'yes' or 'no'", 
    "Global Commands: \r\n exit  \r\n reset \r\n save \r\n settings \r\n help",
    ]
let gamePrint = "";
let newLine = "";
const inventoryArr = [];
var x;

if (localStorage.getItem('progress')) {
    x = 0;
    globalCommand = 0;
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
    dialogArr[x].forEach(element => print(element));
}

roomText(x);

function playerSubmission(event) {
    playerInput = input.value;
    print("\r\n" + playerInput + "\r\n");
//global commands--
    if (globalCommandArr.includes(playerInput)) {
        globalCommand = globalCommandArr.indexOf(playerInput);
        response = globalRespArr[globalCommand];
        if (globalCommand === 3 && localStorage.getItem('progress')) {
            response = "This will overwrite previous save." + response;
        }
        print(response);
    } else if (globalCommand !== false) {
        if (globalCommand === 0) {
            //continue
            if (playerInput === "yes") {
                x = localStorage.getItem('progress');
                inventoryArr.push(localStorage.getItem('inventory'));
                globalCommand = false;
                roomText(x);
            } else if (playerInput === "no") {
                globalCommand = false;
                gamePrint= "";
                x = 1;
                roomText(x);
            } else {
                response = "I didn't understand your input please try again.";
            }
        } else if (globalCommand === 1) {
            //exit
            if (playerInput === "yes") {
                response = "Well we can't do that yet...";
                print(response  + "\r\n");
                globalCommand = false;
                roomText(x);
            } else if (playerInput === "no") {
                roomText(x);
                globalCommand = false;
            } else {
                response = "I didn't understand your input please try again.";
            }
        } else if (globalCommand === 2 && !localStorage.getItem('progress')) {
            location.reload();
            globalCommand = false;
            x = 1;
        } else if (globalCommand === 2) {
            //reset
            if (playerInput === "yes") {
                localStorage.removeItem('progress');
                localStorage.removeItem('inventory');
                response= "Save data reset";
                print(response);
            } else if (playerInput === "no") {
                globalCommand = false;
                gamePrint = "";
                roomText(x);
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
                roomText(x);
                globalCommand = false;
            } else if (playerInput === "no") {
                globalCommand = false;
                roomText(x);
            } else {
                response = "I didn't understand your input please try again.";
            }
        } else if (globalCommand === 4) {
            //testMode
            if (playerInput === "exit") {
                globalCommand = false;
                gamePrint = "";
                roomText(x);
            } else {
                globalCommand = false;
                gamePrint = "";
                roomText(x);
            }
        } else if (globalCommand === 5) {
            //settings
            if (playerInput === "yes") {
                globalCommand = false;
                menuToggle();
            } else if (playerInput === "no") {
                globalCommand = false;
                roomText(x);
            } else {
                response = "I didn't understand your input please try again.";
            }
        } else  {
            response = "I didn't understand your input please try again.";
            globalCommand = false;
            gamePrint = "";
            roomText(x);
        }
    } else {
    if (playerInput === "door") {
        if (inventoryArr.includes("key")) {
            x = 5;
            newLine = "You find the door, quickly force the key into the lock and force it open with all your might";
            print(newLine);
        } else {
            newLine = "You lunge for the door, only to find it is locked, if only you had a key...";
            print(newLine)
            newLine = "Do you head for the light, or try the door, again?"
            print(newLine);
            x=3;
        }
    } else if (playerInput === "light") {
        roomText(x);
        inventoryArr.push("key");
        newLine = "oh cool, maybe try the door again?"
        print(newLine);
        x = 2; 
    } else {
        newLine = "I don't  understand your input, plase try again";
        print(newLine)
        roomText(x);
    }



}    
//--------------------------------------
    event.preventDefault();
}


form.addEventListener('submit', playerSubmission);


