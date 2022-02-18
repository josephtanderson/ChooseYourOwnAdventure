const gameText = document.getElementById("gametext");
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
    gamePrint = gamePrint + "\r\n" + newLine + "\r\n";
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
        newLine = "I don't  understand your input, plase try again";
        print(newLine);
        print(dialog1Arr[1]);
        print(dialog1Arr[2]);
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


