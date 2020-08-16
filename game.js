function agedays(){
    var x=prompt("birthyear");
    var age_y=2020-x;
    var age_d=Math.trunc(age_y*365.25); //.25 is multipied so as count 1 more day every 4 years(leap year)
    var h1=document.createElement('h1');
    var answer=document.createTextNode('You are'+age_d+'days old.');
    h1.setAttribute('id', 'age_d');
    h1.appendChild(answer);
    document.getElementById('flex-box-result').appendChild(h1);
    //console.log(age_d); //after getting rid of fravtional part
}

function reset(){
    document.getElementById('age_d').remove();
}

function bhai(){
    var img = document.createElement("img");
    img.src = "selmon.png";
    //img= img.transformation({crop: 'scale', width: 200});
    var srcs = document.getElementById("bhai");
    srcs.appendChild(img);

}

//rock paper scissor

function rpsGame(yourChoice){
    console.log(yourChoice);
    var human, bot;
    human= yourChoice.id;
    bot= numToChoice(randomRps());
    results=decideWinner(human, bot);
    message= finalMessage(results);
    rpsFrontEnd(yourChoice.id, bot, message);
}

function randomRps(){
    return Math.floor(Math.random()*3);
}

function numToChoice(number){
    return['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, compChoice){
    var rpsDatabase={
        'rock':{'scissor':1, 'rock':0.5, 'paper':0},
        'paper':{'scissor':0, 'rock':1, 'paper':0.5},
        'scissor':{'scissor':0.5, 'rock':0, 'paper':1}
    };
    var yourScore=rpsDatabase[yourChoice][compChoice];
    var compScore=rpsDatabase[compChoice][yourChoice];
    return [yourScore, compScore];
}

function finalMessage([yourScore, compScore]){
    if (yourScore===0){
        return {'message':'Tum haar gaye', 'color': 'red'};
    } else if (yourScore===0.5){
        return {'message': 'Koi nahi jeeta', 'color':'yellow'};
    } else {
        return {'message': 'Mithai baat do sheher mein', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src 
    };
    //remove images once one is chosen
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='" + imagesDatabase[humanImageChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    botDiv.innerHTML="<img src='" + imagesDatabase[botImageChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    messageDiv.innerHTML="<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

}


//rang badlo
var all_buttons= document.getElementsByTagName('button');

var copyAllButtons=[];
for(let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonz){
    if(buttonz.value=='red'){
        buttonRed();
    } else if(buttonz.value=='green'){
        buttonGreen();
    } else if(buttonz.value=='reset'){
        buttonColorReset();
    } else if(buttonz.value=='random'){
        randomColors();
    }
}

function buttonRed(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i = 0; i <all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices=['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for(let i = 0; i <all_buttons.length; i++){
        k=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        //all_buttons[i].classList.add(copyAllButtons[k]);
        all_buttons[i].classList.add(choices[k]);
    }
}

//blackjack
let blackjackGame={
    'you':{'scoreSpan' : '#your-blackjack-result', 'div': 'your-box', 'score':0},
    'dealer':{'scoreSpan' : '#dealer-blackjack-result', 'div': 'dealer-box', 'score':0},
    'cards':['2', '3', '4', '5', '6', '7', '8', '9', '10', 'k', 'J', 'Q', 'A'],
    'cardsMap':{'2':2 , '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'k':10, 'J':10, 'Q':10, 'A':[1,11]},
    'wins':0, 
    'losses':0, 
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};
const YOU= blackjackGame['you'];
const DEALER= blackjackGame['dealer'];

const hitSound= new Audio('sounds/swish.m4a');
const winSound= new Audio('sounds/cash.mp3');
const lossSound= new Audio('sounds/aww.mp3');
document.querySelector('#black-jack-result').textContent='Khelo';
document.querySelector('#black-jack-result').style.color='black';

k=document.getElementById('hit-button');
if (k) {
    k.addEventListener('click', blackjackhit);
}

document.getElementById('deal-button').addEventListener('click', blackjackDeal);
document.getElementById('stand-button').addEventListener('click', dealerLogic);

function blackjackhit() {
    if(blackjackGame['isStand']=== false){
        let card=randomCard();
        //console.log(card);
        showCard(card,YOU);
        //showCard(DEALER);
        updateScore(card, YOU);
        showScore(YOU);
    }
    
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src= `images/${card}.png`;
    document.getElementById(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }  
} 

function blackjackDeal(){
    if(blackjackGame['turnsOver']===true){
        blackjackGame['isStand']= false;

        let yourImages= document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages= document.querySelector('#dealer-box').querySelectorAll('img');
        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='blue';
        document.querySelector('#dealer-blackjack-result').style.color='blue';

        document.querySelector('#black-jack-result').textContent='Khelo';
        document.querySelector('#black-jack-result').style.color='black';

        blackjackGame['turnsOver']=true;
    }   
}


function updateScore(card, activePlayer) {
    //If adding 11 keeps me below 21, add 11, otherwise, add 1.
    if (card == 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<-21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    } else {
            activePlayer['score']+=blackjackGame['cardsMap'][card];
    }  

}

function showScore(activePlayer){
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    } else{  
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand']=true;

    while(DEALER['score']<16 && blackjackGame['isStand']==true){
        let card=randomCard();
        showCard(card, DEALER);
        updateScore(card,DEALER);
        showScore(DEALER); 
        await sleep(1000);
    }
    blackjackGame['turnsOver']=true;
    let winner=computerWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver']);
          
}

//computer winner
//update the wins, draws and losses
function computerWinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++;
            winner=YOU;
        } else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        } else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
        } 
        //when user busts but dealer doesn't
    } else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;

        //when you and dealer both busts
    } else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    console.log('Winner is ', winner);
    console.log(blackjackGame['losses']);
    return winner; 
}

function showResult(winner){

    let message, messageColor;

    if(blackjackGame['turnsOver']===true){
       if (winner===YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message ='You won!';
        messageColor='green';
        winSound.play();
    } else if(winner===DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message ='You lost!';
        messageColor='red';
        lossSound.play();
    } else{
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You drew!';
        messageColor='black';
    }
    //document.querySelector('#black-jack-result').textContent='';
    document.querySelector('#black-jack-result').textContent=message;
    document.querySelector('#black-jack-result').style.color=messageColor;
    } 
}

//see if in the original this happens-- when there are no cards and deal is hit, it shows 'you drew!'. see how you can go back to 'khelo'   
//starts fixing at 7:17:30





