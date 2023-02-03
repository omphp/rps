const pChoice = document.querySelectorAll(".Btn");
pChoice.forEach((pChoice) => pChoice.addEventListener('click', moveIcon));
const pScore = document.querySelector("#playerScore");
const cScore = document.querySelector("#computerScore");
const gameCount = document.querySelector("#gameCount");
const oWinner = document.querySelector("#winner");
const pChoices = document.querySelector("#pChoices");
const cChoices = document.querySelector("#cChoices");
const icons = document.querySelectorAll(".pChoice");
const cIcons = document.querySelectorAll(".cChoice");

let current_rotation = 0;
let cCurrentRotation = 0;
let choices = ["rock", "paper", "scissors"];
let pWin = 0;
let cWin = 0;
let gameCtr = 0;
let playerChoice = '';
let computerChoice = '';
let pChoose = '';
let cChoose = '';
let isWinner = false;

cChoices.addEventListener("transitionend", game);

function moveIcon(e) {
    if (e.target.id === "upImg")
    {
        pChoices.classList.add("rotate");
        icons.forEach((icon)=> icon.classList.add("rotate"));
        current_rotation -= 90;
        if (current_rotation === -180 || ((current_rotation - 180)%360) == 0) current_rotation -= 90;
        icons.forEach((icon)=> icon.style.transform = 'rotate(' + (-1*current_rotation) + 'deg)');
        pChoices.style.transform = 'rotate(' + current_rotation + 'deg)';   
    }
    else
    {
        pChoices.classList.add("rotate");
        icons.forEach((icon)=> icon.classList.add("rotate"));
        current_rotation += 90;
        if (current_rotation === 180 || ((current_rotation + 180)%360) == 0) current_rotation += 90;
        icons.forEach((icon)=> icon.style.transform = 'rotate(' + (-1*current_rotation) + 'deg)');
        pChoices.style.transform = 'rotate(' + current_rotation + 'deg)';
    } 
}

function getComputerChoice() {
    cChoices.classList.add("cRotate");
    cCurrentRotation += 1800 + (90 * Math.floor(Math.random()*3));
    if (cCurrentRotation === 180 || ((cCurrentRotation + 180)%360) == 0) cCurrentRotation += 90;
    cChoices.style.transform = 'rotate(' + cCurrentRotation + 'deg)';
    cIcons.forEach((cIcon)=> cIcon.style.transform = 'rotate(' + (-1*cCurrentRotation) + 'deg)');
    if ((cCurrentRotation % 360) === 0) computerChoice = 0;
    else if (((cCurrentRotation + 90) % 360) === 0) computerChoice = 2;
    else computerChoice = 1;
    return computerChoice
}

function getPlayerChoice(){
    if (current_rotation === 0 || (current_rotation % 360) === 0) playerChoice = 0;
    else if (current_rotation === -90 || ((current_rotation + 90) % 360) === 0) playerChoice = 1;
    else playerChoice = 2;
    return playerChoice
}

function playRound(playerSelection, computerSelection)
{
    gameCtr++;
    if (playerSelection === computerSelection)
    {
        console.log("It's a tie");
        pScore.innerText = pWin;
        cScore.innerText = cWin;
    }
    else 
    {
        if ((playerSelection === 0 && computerSelection === 1) 
            || (playerSelection === 1 && computerSelection === 2) 
            || (playerSelection === 2 && computerSelection === 0))
        {
            cWin++;
            cScore.innerText = cWin;
        }
        else 
        {
            pWin++;
            pScore.innerText = pWin;
        }
    }
    document.getElementById("playGame").disabled = false;
    pChoice.forEach((pChoice) => pChoice.addEventListener('click', moveIcon));
}

function game()
{
    playRound(pChoose, cChoose);
    if (pWin === 5 || cWin === 5)
    {
        isWinner = true;
        if (pWin === cWin)
        {
            console.log("Overall Result: Tie");
            oWinner.innerText = "Tie";
        }
        else if(pWin > cWin)
        {
            console.log("Player Wins");
            oWinner.innerText = "Player Wins";
        }
        else 
        {
            console.log("Computer Wins");
            oWinner.innerText = "Computer Wins";
        }
    }
}
function playGame()
{
    if (isWinner)
    {
        isWinner = false;
        gameCtr = 0;
        pWin = 0;
        cWin = 0;
        cScore.innerText = cWin;
        pScore.innerText = pWin;
        oWinner.innerText = "";
    }
    pChoose = getPlayerChoice();
    cChoose = getComputerChoice();
    document.getElementById("playGame").disabled = true;
    pChoice.forEach((pChoice) => pChoice.removeEventListener('click', moveIcon));
}
