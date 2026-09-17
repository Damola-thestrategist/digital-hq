const journeyViewport = document.querySelector(".journey-viewport");

const journeyTrack = document.querySelector(".journey-overall");

const journeyCards = document.querySelectorAll(".journey-card");

let currentCard = 0;

console.log("Journey cards found:", journeyCards.length);

const cardWidth = journeyCards[0].offsetWidth;
const cardGap = 30;

journeyTrack.style.transform = `translateX(-${cardWidth + cardGap}px)`;

function showJourneyCard(index) {
    if (index >= journeyCards.length) {
        index = 0;
    }

    if (index < 0) {
        index = journeyCards.length - 1;
    }

    currentCard = index;

    const cardWidth = journeyCards[0].offsetWidth;
    const cardGap = 30;
    const moveAmount = cardWidth + cardGap;

    journeyTrack.style.transform = `translateX(-${currentCard * moveAmount}px)`;
}

let isDragging = false;
let startex = 0;

journeyViewport.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
});

journeyViewport.addEventListener("mouseup", (event) => {
    if (!isDragging) return;

    isDragging = false;

    const distance = event.clientX - startX;

   const threshold = 80;

if (Math.abs(distance) > threshold) {
    if (distance < 0 && currentCard < journeyCards.length - 1) {
        currentCard++;
    }

    if (distance > 0 && currentCard > 0) {
        currentCard--;
    }
}

showJourneyCard(currentCard);
});

journeyViewport.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const distance = event.clientX - startX;

    journeyTrack.style.transition = "none";

    const cardWidth = journeyCards[0].offsetWidth;
    const cardGap = 30;
    const moveAmount = cardWidth + cardGap;

    const currentPosition = -(currentCard * moveAmount);

    journeyTrack.style.transition = "transform 0.6s ease";
    journeyTrack.style.transform =
        `translateX(${currentPosition + distance}px)`;
});

const previousButton = document.querySelector(".journey-prev");
const nextButton = document.querySelector(".journey-next");

previousButton.addEventListener("click", () => {
    showJourneyCard(currentCard - 1);
});

nextButton.addEventListener("click", () => {
    showJourneyCard(currentCard + 1);
});
