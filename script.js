const cards = document.querySelectorAll(".card");
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let isPlaying = false;
let cardOne, cardTwo, timer;
let disableDeck = false;  

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard(e){
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    let clickedCard = e.target; // getting user clicked card
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
            flips++;
            flipsTag.innerText = flips;
            clickedCard.classList.add("flip");
        if(!cardOne){
            // return the cardone value to clickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }

}
    function matchCards(img1, img2) {
        if(img1 === img2){ // if two cards img matched
            matchedCard++; //increment matched value by 1
            // if matched value is 8 that means user has matched all the cards(8 * 2 = 16 cards)
            if(matchedCard == 8 && timeLeft > 0) {
                return clearInterval(timer); //calling shuffleCard function after 1 sec 
            }
            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);
            cardOne = cardTwo = ""; //setting both card value to blank
            return disableDeck = false;
        }
        // if two card not matched
         setTimeout(() => {
            //adding shake class to both card after 400ms
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
         }, 400);

         setTimeout(() => {
            //remove both shake & flip classes to both card after 1.2 seconds
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = ""; //setting both card value to blank
            disableDeck = false;
         }, 1200);
    }
        function shuffleCard() {
            timeLeft = maxTime;
            flips = matchedCard = 0;
            cardOne = cardTwo = "";
            clearInterval(timer);
            timeTag.innerText = timeLeft;
            flipsTag.innerText = flips;
            disableDeck = isPlaying = false;
            //Creting array of 16 items and each item is repeated twice
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3,4, 5,6, 7, 8];
            arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array item random()

           // removing flip class from all cards and passing random image to each card 
            cards.forEach((card, index) => { 
                card.classList.remove("flip");
                let imgTag = card.querySelector("img");
                setTimeout(() => {
                    imgTag.src = `images/img-${arr[index]}.png`;
                }, 500);
                card.addEventListener("click", flipCard);
            });
                   
        }
        shuffleCard(); 

        refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {  // adding click to all cards   
    card.addEventListener("click", flipCard);
});