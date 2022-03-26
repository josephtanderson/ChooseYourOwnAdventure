//032622
const stylesheet = document.styleSheets[0];
const globalStyle = stylesheet.cssRules[1].style;
const settings = document.getElementById("hide-settings");
const settingsBtn = document.getElementById("settings-btn");
const settingsMenuBtn = document.getElementById("settings-menu-btn");
const menuStyle = stylesheet.cssRules[6].style;
var menuHidden = true;
const fsToggleBtn = document.getElementById("fullscreen-setting-toggle");
const tgToggleBtn = document.getElementById("textglow-setting-toggle");
const themeBtn = document.getElementById("color-wrapper");
var theme = 0; 
var themeArr = [["var(--theme-one-font)", "var(--theme-one-glow)", "var(--theme-one-bg)"],["var(--theme-two-font)", "var(--theme-two-glow)", "var(--theme-two-bg)"],["var(--theme-three-font)", "var(--theme-three-glow)", "var(--theme-three-bg)"],["var(--theme-four-font)", "var(--theme-four-glow)", "var(--theme-four-bg)"]]
var textGlow = true;
const fsToggleBtnStyle = stylesheet.cssRules[16].style;
// const taToggleBtnStyle = stylesheet.cssRules[17].style;
const tgToggleBtnStyle = stylesheet.cssRules[17].style;
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
var i = 0;

var fullscreen = false;

function screenSizing() {
    if (window.visualViewport.width < window.visualViewport.height) {
        viewMin = window.visualViewport.width;
    } else {
        viewMin = window.visualViewport.height;
    }
    if (viewMin >= 1400){
        currentFontSize = "32px"
        currentWidth = "1391px";
        currentHeight = "1192px";
        fullscreen= false;
    } else if (viewMin >= 800) {
        currentFontSize = "16px"
        currentWidth = "724px"
        currentHeight = "620px";
        fullscreen= false;
    } else if (viewMin >= 455) {
        currentFontSize = "12px"
        currentWidth = "554px"
        currentHeight = "476px";
        fullscreen= false;
    } else if (viewMin < 455){
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
    screenSizeStyle.setProperty('width', "100vw");
    screenSizeStyle.setProperty("height","100vh");
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

window.visualViewport.addEventListener('resize', event => {screenSizing(); console.log(visualViewport.width, visualViewport.height)} );

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
function changeTheme() {
    if (theme === 3) theme = -1;
    theme ++;
    globalStyle.setProperty('--type-color', themeArr[theme][0]);
    globalStyle.setProperty('--text-glow', themeArr[theme][1]);
    globalStyle.setProperty('--bg-color', themeArr[theme][2]);
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
        globalStyle.textShadow = "var(--text-glow) 0px 0px 10px";
    }
}
fsToggleBtn.addEventListener('click', fsBtnToggle);
themeBtn.addEventListener('click', changeTheme);
tgToggleBtn.addEventListener('click', tgBtnToggle);


//----------------------------------------------------------//
const gameText = document.getElementById("text-log");
const form = document.getElementById('form');
const input = document.getElementById("player-input");

var response;
// var globalCommand = false;
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

const globalCommand = {
    isGlobalCommand: false,
    testmode: "1________1_________2_________3_________41",
    exit: "Are you sure you want to exit?",
    reset : "Do you want to reset? \r\n(This will remove your saved data) \r\n'yes' or 'no'",
    save : "Save your Game?\r\n'yes' or 'no'",
    settings:  "Open the settings menu? \r\n'yes' or 'no'",
    help : "Global Commands: \r\n exit  \r\n reset \r\n save \r\n settings \r\n help\r\n"
}

let gamePrint = "";
let newLine = "";
const inventoryArr = [];
var x;
var back;

if (localStorage.getItem('progress')) {
    globalCommand.isGlobalCommand = 'continue';
    x = 0;
    inventoryArr.push(localStorage.getItem('inventory'));
} else {
    x = 1;
} 
var playerInput ="";

const print = (textToPrint) => {
    gamePrint = "\r\n" + gamePrint + textToPrint + "\r\n";
    gameText.textContent = gamePrint;
    input.value= "";
}

const roomText = (roomNum) => {
    let text = "";
    for (y=0; y<dialogArr[roomNum].length; y++) {
    text += dialogArr[roomNum][y] + "\r\n";
    }
    return text;
}

function findCommand(input){
    if (input === "") return "blank";
    let inputTest = input.toLowerCase().split(" ");
    for (i = 0 ; i <inputTest.length; i++) {
        if (globalCommand.hasOwnProperty(inputTest[i])) {
            return inputTest[i];
        }
        if (globalCommand.isGlobalCommand) {
            if (inputTest[i] === "yes" || inputTest[i] === "no") return inputTest[i];
            return "Input not recognized";
        }
        if (optionArr1[x].includes(inputTest[i]) ||
            optionArr2[x].includes(inputTest[i]) ||
            globalCommand.hasOwnProperty(inputTest[i])) {
                return inputTest[i];
        }
        if (inputTest[i] === "back") return "back";
    }
    return "Input not recognized";
}

const findResponse = (com) => {
    if (!globalCommand.isGlobalCommand){
        if (globalCommand.hasOwnProperty(com)){
            globalCommand.isGlobalCommand = com;
            return globalCommand[com];
        }
        if (com === optionArr1[x]) {
            x = newDoorArr[x][0];
            newDoorArr[2].unshift(x);
            return roomText(x);
        }
        if (com === optionArr2[x]) {
            x = newDoorArr[x][1];
            newDoorArr[2].unshift(x);
            return roomText(x);
        }
        if (com === "back") {
            x = 2;
            return roomText(x);
        }
        if (com === "blank" && menuHidden===false){
            menuToggle();
            gameText = "";
            return roomText(x);
        }
    }
    let resp = "";
    switch (globalCommand.isGlobalCommand) {
        case 'continue':
            if (com === "no") {
                globalCommand.isGlobalCommand = "reset";
                resp = globalCommand.reset;
            }
            x = localStorage.getItem('progress');
            break;
        case 'exit':
            if (com === "yes") {
                resp = "Well we can't do that yet...";
                        
            };
            globalCommand.isGlobalCommand = false;
            break;
        case 'reset':
            if (com === "yes") {
                localStorage.removeItem('progress');
                localStorage.removeItem('inventory');
                resp = "save data reset";
                setTimeout(() => {
                    print("restarting");
                    location.reload();
                }, 1750);
            }
            globalCommand.isGlobalCommand = false;
            break;
        case 'save':
            if (com === "yes") {
                localStorage.setItem('progress', x);
                localStorage.setItem('inventory', inventoryArr);
                resp = "Game Saved";
            }
            globalCommand.isGlobalCommand = false;
            break;
        case 'settings':
            if (com === "yes") {
                menuToggle();
                resp = " ";
            }
            globalCommand.isGlobalCommand = false;
            break;
        case 'help':
            globalCommand.isGlobalCommand = false;
            break;
        default:
            globalCommand.isGlobalCommand = false;
            resp = "I don't  understand your input, please try again \r\n";
    }
    if (!resp) resp = roomText(x);
    return resp;
}



print(roomText(x));
function playerSubmission(event) {
    playerInput = input.value;
    print("\r\n" + playerInput + "\r\n");
    let command = findCommand(playerInput);
    //test keyword 
    response = findResponse(command);
    //print response
    print(response);

    event.preventDefault();
}
form.addEventListener('submit', playerSubmission);


    //         } else if (globalCommand.isGlobalCommand === 4) {
    //             //settings
    //             if (playerInput === "yes") {
    //                 menuToggle();
    //                 response = " ";
    //             } 
    //         }
    //         print(response);
    //         globalCommand.isGlobalCommand = false;
    //     } else {
    // //--------------------------------------------------------------------------------------------------
    //         if (playerInput === optionArr1[x]) {
    //             x = newDoorArr[x][0];
    //             roomText(x);
    //             newDoorArr[2].unshift(x);
    //         } else if (playerInput === optionArr2[x]) {
    //             x = newDoorArr[x][1];
    //             roomText(x);
    //             newDoorArr[2].unshift(x);
    //         } else if (playerInput === "back") {
    //             x = 2;
    //             roomText(x);
    //         } else {
    //             response = "I don't  understand your input, please try again \r\n";
    //             print(response);
    //         }
    // //--------------------------------------------------------------------------------------------------    
    //     }
    // } else {
    //     if (menuHidden === false) {
    //         menuToggle();
    //     } else {
    //         response = "No input detected";
    //         print("\r\n"+response+"\r\n");
    //     }
    // }
    //--------------------------------------------------------------------------------------------------