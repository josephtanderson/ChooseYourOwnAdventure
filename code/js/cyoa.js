//022022-1834

onst stylesheet = document.styleSheets[0];
const globalStyle = stylesheet.cssRules[0].style;
const settings = document.getElementById("hide-settings");
const settingsBtn = document.getElementById("settings-btn");
const settingsMenuBtn = document.getElementById("settings-menu-btn");
const menuStyle = stylesheet.cssRules[5].style;
var menuHidden = true;
const fsToggleBtn = document.getElementById("fullscreen-setting-toggle");
const taToggleBtn = document.getElementById("typeanimations-setting-toggle");
const tgToggleBtn = document.getElementById("textglow-setting-toggle");
var fullscreen = false;
var textAnimations = true;
var textGlow = true;
const fsToggleBtnStyle = stylesheet.cssRules[15].style;
const taToggleBtnStyle = stylesheet.cssRules[16].style;
const tgToggleBtnStyle = stylesheet.cssRules[17].style;
const screenSizeStyle = stylesheet.cssRules[3].style;
const screenSize = stylesheet.cssRules[2].style;

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
    console.log(button);
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
        toggleBtn(fsToggleBtnStyle, fullscreen);
        screenSizeStyle.width = "640px";
        screenSizeStyle.height = "400px";
        screenSizeStyle.borderStyle = "solid";
        screenSizeStyle.padding = "0";
        screenSize.width = "88vmin";
        screenSize.height = "66vmin";
        globalStyle.fontSize = "large";
    } else {
        fullscreen = true;
        toggleBtn(fsToggleBtnStyle, fullscreen);
        screenSizeStyle.width = "100vw";
        screenSizeStyle.height = "100vh";
        screenSizeStyle.borderStyle = "none";
        screenSizeStyle.padding = "50px";
        screenSize.width = "100%";
        screenSize.height = "100%";
        globalStyle.fontSize = "xx-large";
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
        console.log(textGlow);
        globalStyle.textShadow = "none";
    } else {
        //if off turn on
        textGlow = true;
        toggleBtn(tgToggleBtnStyle, textGlow);
        console.log(textGlow);
        globalStyle.textShadow = "var(--text-glow)";
    }
}
fsToggleBtn.addEventListener('click', fsBtnToggle);
taToggleBtn.addEventListener('click', taBtnToggle);
tgToggleBtn.addEventListener('click', tgBtnToggle);


//----------------------------------------------------------//


const gameText = document.getElementById("text-log");
const form = document.getElementById('form');
const input = document.getElementById("player-input");

const dialog1Arr = ['You wake up in a strange place...', 
'You see a light in the distance, and a door to you left.',
'Do you head for the light, or try the door?'];
let gamePrint = "";
let newLine = "";
let x = 0;

const inventoryArr = [];

function print(newLine){
        gamePrint = gamePrint /*+ "\r\n" */+ newLine + "\r\n";
    gameText.textContent = gamePrint;
    input.value= "";
}

for (let y=0; y<dialog1Arr.length; y++) {
    print(dialog1Arr[y])
    } 
    newLine = input.value;
    gamePrint = gamePrint + "\r\n" + newLine + "\r\n";
    gameText.textContent = gamePrint;
    input.value= "";
    if (newLine === "door") {
        x = 1;
        newLine = /*prompt*/ "example";
        gamePrint = gamePrint + "\r\n" + newLine + "\r\n";
        gameText.textContent = gamePrint;
    } 

function playerSubmission(event) {
    if (x === 0) {
        playerInput = input.value;
        print(playerInput);
    if (playerInput === "door") {
        if (inventoryArr.includes("key")) {
            newLine = "You find the door, quickly force the key into the lock and force it open with all your might";
            print(newLine);
            x = 5;
        } else {
            newLine = "You lunge for the door, only to find it is locked, if only you had a key...";
            print(newLine)
            newLine = "Do you head for the light, or try the door, again?"
            print(newLine)
            x = 0;
        }
    } else if (playerInput === "light") {
        newLine = "You head toward the light, uneasy of where you are...\r\n";
        print(newLine);
        newLine = "As you approach, "
        x = 1; 
    } else {
        newLine = "I don't  understand your input, plase try again _________9_________0";
        newLine = "_̅_̅_̅_̅_1_̅_̅_̅_̅_2_̅_̅_̅_̅_3_̅_̅_̅_̅_4_̅_̅_̅_̅_5_̅_̅_̅_̅_6_̅_̅_̅_̅_7_̅_̅_̅_̅_8";
        print(newLine);
        // print(dialog1Arr[1]);
        // print(dialog1Arr[2]);
        x = 0;
    }
} else if (x === 1) {
    playerInput = input.value;
    print(playerInput);
    
} else if (x === 2) {

} else if (x === 3) {
    
} else if (x === 4) {
    
} else if (x === 5) {
    
} else if (x === 6) {
    
}



    
//--------------------------------------
    event.preventDefault();
}


form.addEventListener('submit', playerSubmission);


