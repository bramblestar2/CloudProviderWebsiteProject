const menuButton = document.getElementById("mobile-menu-button");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});