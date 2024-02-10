function changePosition() {
    const noButton = document.querySelector('.no');
    const box = document.querySelector('.box');

    // Get box dimensions
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    // Calculate random position within screen boundaries
    const maxX = window.innerWidth - boxWidth;
    const maxY = window.innerHeight - boxHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Ensure button stays within screen boundaries
    const boundedX = Math.min(Math.max(randomX, 0), maxX);
    const boundedY = Math.min(Math.max(randomY, 0), maxY);

    // Move the button to the bounded position
    noButton.style.left = boundedX + 'px';
    noButton.style.top = boundedY + 'px';
}
function changeText() {
    const text = document.querySelector('.text');
    const gif = document.querySelector('.gif1');

    text.textContent = "I Love you Too! ❤️";
    gif.src = "happy-dance.gif";
}   

let noButtonClickCount = 0; // Variable to track the number of times the "No" button is clicked

const noButton = document.querySelector('.no');
const gif = document.querySelector('.gif1');

noButton.addEventListener('click', () => {
     // Change the source when the "No" button is clicked
    
    if (noButtonClickCount === 0) {
        document.querySelector('.text').textContent = "Please";
        gif.src = "cute-anime-crying.gif"; // Change the text to "Please" for the first click
    } else {
        document.querySelector('.text').textContent = "SAY YES PLZZZZ";
        gif.src = "crying-cute-anime.gif"; // Change the text to "SAY YES PLZZZZ" for subsequent clicks
    }
    
    noButtonClickCount++; // Increment the click count
});
