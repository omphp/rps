let choices = ["rock", "paper", "scissors"]
let pWin = 0
let cWin = 0
function getComputerChoice() {
    let choice = Math.floor(Math.random()*choices.length)
    return choice
}

function getPlayerChoice(reprompt = ""){
    let playerChoice = prompt(`${reprompt}Enter your Choice`).toLowerCase()
    let choice = choices.indexOf(playerChoice)
    if (choice != -1)
    {
        return choice
    }
    getPlayerChoice("Invalid! ")
}

function playRound(playerSelection, computerSelection)
{
    if (playerSelection === computerSelection)
    {
        console.log("It's a tie")
    }
    else 
    {
        if ((playerSelection === 0 && computerSelection === 1) 
            || (playerSelection === 1 && computerSelection === 2) 
            || (playerSelection === 2 && computerSelection === 0))
        {
            cWin++
            console.log(`You Lose! ${choices[computerSelection]} beats ${choices[playerSelection]}`)
        }
        else 
        {
            pWin++
            console.log(`You Win! ${choices[playerSelection]} beats ${choices[computerSelection]}`)
        }
    }
}

function game()
{
    for (let i = 0; i < 5; i++)
    {
        let pChoice = getPlayerChoice()
        let cChoice = getComputerChoice()
        playRound(pChoice, cChoice)
    }
    
    if (pWin === cWin)
    {
        console.log("Overall Result: Tie")
    }
    else if(pWin > cWin)
    {
        console.log("Player Wins")
    }
    else 
    {
        console.log("Computer Wins")
    }
}

game()