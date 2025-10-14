const form = document.querySelector('form');
const unavailableMessage = document.getElementById('unavailable');
const submitSound = document.getElementById('submit-sound');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    unavailableMessage.style.display = 'block';
    submitSound.play();
});