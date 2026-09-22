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

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');

    if (!menuToggle || !navigation) return;

    // Open/close on hamburger click
    menuToggle.addEventListener('click', function () {
        navigation.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close when a nav link is tapped (mobile UX expectation)
    navigation.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navigation.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close when tapping outside the menu
    document.addEventListener('click', function (e) {
        const isClickInsideNav = navigation.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideNav && !isClickOnToggle && navigation.classList.contains('active')) {
            navigation.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu automatically if window is resized back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navigation.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});s