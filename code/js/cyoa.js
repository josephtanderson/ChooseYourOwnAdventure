
const gameText = document.getElementById("text-log");const stylesheet = document.styleSheets[0].cssRules;
const windowSize = window.visualViewport;
var screenWidth = window.visualViewport["width"];
var screenHeight = window.visualViewport["height"];
const globalStyle = stylesheet[0].style;
const gameScreen = document.getElementById('display-screen');
var gameScreenX;
var gameScreenY;
const settings = document.getElementById("hide-settings");
const openSettingsBtn = document.getElementById("open-settings-btn");
const closeSettingsBtn = document.getElementById("close-settings-menu-btn");
const menuStyle = stylesheet[4].style;
var menuHidden = true;
const fsToggleBtn = document.getElementById("fullscreen-setting-toggle");
const taToggleBtn = document.getElementById("typeanimations-setting-toggle");
const tgToggleBtn = document.getElementById("textglow-setting-toggle");
const monitorBorder = document.getElementById("foreground-border");
var fullscreen = false;
var textAnimations = true;
var textGlow = true;
const fsToggleBtnStyle = stylesheet[14].style;
const taToggleBtnStyle = stylesheet[15].style;
const tgToggleBtnStyle = stylesheet[16].style;
const screenSizeStyle = stylesheet[2].style;
const foregroundStyle = stylesheet[30].style;
const monitorBorderStyle = stylesheet[31].style;
const widthArr = ["960px","640px","512px","320px"];
const heightArr = ["720px","480px","384px","240px"];


//screen scaling
function fullscreenOn() {
    fullscreen = true;
        toggleBtn(fsToggleBtnStyle, fullscreen);
        screenSizeStyle.width = "100vw";
        screenSizeStyle.height = "100vh";
        screenSizeStyle.padding = "50px";
        foregroundStyle.visibility="hidden";
        globalStyle.fontSize = "xx-large";
}

function fullscreenOff() {
    screenWidth = window.visualViewport["width"];
    screenHeight = window.visualViewport["height"];
    if ( screenWidth<screenHeight){
        viewMin = screenWidth;
    } else {
        viewMin = (screenHeight);
    }
    fullscreen = false;
    //toggle visuals
    toggleBtn(fsToggleBtnStyle, fullscreen);
    screenScaling();
    foregroundStyle.visibility="visible";
    globalStyle.fontSize = "large";
}

function screenScaling() {
    screenWidth = window.visualViewport["width"];
    screenHeight = window.visualViewport["height"];
    if ( screenWidth<screenHeight){
        viewMin = screenWidth;
    } else {
        viewMin = screenHeight;
    }
    if (viewMin >= 1200) {
        screenSizeStyle.width = widthArr[0];
        screenSizeStyle.height = heightArr[0];
        monitorBorderStyle.width = widthArr[0];
        monitorBorderStyle.height = heightArr[0];
    } else if (viewMin >=992) {
        screenSizeStyle.width = widthArr[1];
        screenSizeStyle.height = heightArr[1];
        monitorBorderStyle.width = widthArr[1];
        monitorBorderStyle.height = heightArr[1];
    } else if (viewMin >=768) {
        screenSizeStyle.width = widthArr[2];
        screenSizeStyle.height = heightArr[2];
        monitorBorderStyle.width = widthArr[2];
        monitorBorderStyle.height = heightArr[2];
    } else if (viewMin >= 576) {
        screenSizeStyle.width = widthArr[3];
        screenSizeStyle.height = heightArr[3];
        monitorBorderStyle.width = widthArr[3];
        monitorBorderStyle.height = heightArr[3];
    } else if (viewMin < 576) {
        fullscreenOn();
    }
}

screenScaling();
windowSize.addEventListener('resize', screenScaling);

//menu visibility 
function menuToggle () {
    if (menuHidden === true) {
    menuStyle.visibility="visible";
    menuHidden=false;
} else if (menuHidden === false) {
    menuStyle.visibility="hidden";
    menuHidden=true;
    }
}
//to open menu
openSettingsBtn.addEventListener('click', menuToggle);
//to close menu
closeSettingsBtn.addEventListener('click', menuToggle);

//settings menu visual toggle
function toggleBtn (button, state) {
    if (state) {
        button.backgroundColor="rgb(27, 161, 34)";
        button.paddingLeft="15px";
    } else {
        button.backgroundColor="rgb(254, 93, 38)";
        button.paddingLeft="2px";
    }
}
//Fullscreen option
function fsBtnToggle() {
    if (fullscreen) {
        //if on turn off
        fullscreen = false;
        //toggle visuals
        toggleBtn(fsToggleBtnStyle, fullscreen);
        screenSizeStyle.padding = "8px";
        foregroundStyle.visibility="visible";
        globalStyle.fontSize = "large";
    } else {
        
        //if off turn on
        fullscreen = true;
        //toggle visuals
        toggleBtn(fsToggleBtnStyle, fullscreen);
        screenSizeStyle.width = "100vw";
        screenSizeStyle.height = "100vh";
        screenSizeStyle.padding = "50px";
        // screenSizeStyle.border = "none";
        foregroundStyle.visibility="hidden";
        globalStyle.fontSize = "xx-large";
    }
}
//text 'typing' animation option
function taBtnToggle() {
    if (textAnimations) {
        //if on turn off
        textAnimations = false;
        //toggle visuals
        toggleBtn(taToggleBtnStyle, textAnimations);
    } else {
        //if off turn on
        textAnimations = true;
        //toggle visuals
        toggleBtn(taToggleBtnStyle, textAnimations);
    }
}
//screen 'glow' option
function tgBtnToggle() {
    if (textGlow) {
        //if on turn off
        textGlow = false;
        //toggle visuals
        toggleBtn(tgToggleBtnStyle, textGlow);
        globalStyle.textShadow = "none";
    } else {
        //if off turn on
        textGlow = true;
        //toggle visuals
        toggleBtn(tgToggleBtnStyle, textGlow);
        globalStyle.textShadow = "var(--text-glow)";
    }
}
fsToggleBtn.addEventListener('click', fsBtnToggle);
taToggleBtn.addEventListener('click', taBtnToggle);
tgToggleBtn.addEventListener('click', tgBtnToggle);


//----------------------------------------------------------//


const form = document.getElementById('form');
const input = document.getElementById("player-input");

const dialogArr = ['You wake up in a strange place...', 
'You see a light in the distance, and a door to you left.',
'Do you head for the light, or try the door?'];
var gamePrint = "";
var newLine = "";
var x = 0;

const inventoryArr = [];

function print(newLine){
        gamePrint = gamePrint /*+ "\r\n" */+ newLine + "\r\n";
        gameText.textContent = gamePrint;
        input.value= "";
}

function playerSubmission(event) {
    console.log(event);
        playerInput = input.value;
        print(playerInput);



//--------------------------------------
    event.preventDefault();
}


form.addEventListener('submit', playerSubmission);
