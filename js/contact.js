const form = document.getElementById('contactForm');
const unavailableMessage = document.getElementById('unavailable');
const submitSound = document.getElementById('submit-sound');


// When a form submit request is made, show the unavailable message and play meme sound
// Could make it where the sound has a 50/50 chance of playing a different sound
form.addEventListener('submit', (event) => {
    event.preventDefault();
    unavailableMessage.style.display = 'block';
    submitSound.play();
});