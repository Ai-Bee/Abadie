/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;
init();
var goal;

/*To read/get the value of an element, we use :
var red = document.querySelector('#current-'+ activePlayer).textContent;
Adjusting CSS
document.querySelector('.btn-roll').style.border = "1px dashed tomato";
**/


//Events 

//call back function, cos we'rt calling it ourselves but is called by the event listener
//document.querySelector('.btn-roll').addEventListener("click",btn);

//anonymous function, it doesn't have a name so it cant be called elsewhere
var lastThrow;

document.querySelector('.btn-roll').addEventListener("click",function(){
    
    //Get a random number

    if(gamePlaying){
        var dice = Math.ceil(Math.random() * 6);
        var theDice = document.querySelector(".dice");
        theDice.style.display = "block";
        //Display the result
        document.querySelector(".dice").src="dice-" + dice + ".png";
    
        // Update the round score if the rolled number was not a 1
        
        
        if(dice !== 1){
            roundScore += dice; 
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();  
        }
    }

    
    if(dice === 6 && lastThrow === 6){
        var curScore = document.getElementById("score-" + activePlayer);
        curScore.textContent = "0";
        scores[activePlayer]=0;
        nextPlayer();
    }
    lastThrow = dice;
});

function nextPlayer(){
    document.querySelector("#current-" + activePlayer).textContent = "0";
    roundScore=0;
    if(activePlayer===0){
        activePlayer=1; 
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.add("active");
    }else if (activePlayer===1){
        activePlayer=0;
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("active");
    }
}

function init(){
    roundScore =0;
    scores = [0,0];
    activePlayer = 0;
    gamePlaying = true;
    
    var theDice = document.querySelector(".dice");
    theDice.style.display = "none";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Nina";
    document.querySelector("#name-1").textContent = "Ruby";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
document.querySelector(".btn-new").addEventListener("click",init);



document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var userChoice = document.querySelector(".final-score").value;
        
        if(userChoice){
            
            goal = userChoice;
        } else {
            goal =20;
        }
        if(scores[activePlayer]>=goal){
            document.getElementById("name-" + activePlayer).textContent = "Winner!!";
            document.querySelector("#score-0").textContent= "0";
            document.querySelector("#score-1").textContent= "0";
            document.querySelector("#current-0").textContent= "0";
            document.querySelector("#current-1").textContent= "0";
        } else {
            nextPlayer();
        }
    }
  
});

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
         After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score,
         so that they can change the predefined score of 100.
          (Hint: you can read that value with the .value property in JavaScript.
             This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.
         The player looses his current score when one of them is a 1.
          (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
