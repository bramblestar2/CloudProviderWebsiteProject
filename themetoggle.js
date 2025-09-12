const html = document.querySelector("html");

const toggleBtn = document.getElementById("theme-toggle");
const toggleIcon = document.getElementById("theme-icon");


if (!toggleBtn || !toggleIcon) {
    console.error("Missing toggleBtn or toggleIcon");
} else {
    const ICONS = {
        light: "public/sun.svg",
        dark: "public/moon.svg"
    };

    const setTheme = (theme) => {
        html.setAttribute("data-theme", theme);
        toggleIcon.src = ICONS[theme];
        toggleBtn.checked = theme === "dark";

        localStorage.setItem("theme", theme);
    }

    const init = () => {
        const current = localStorage.getItem("theme") || "light";
        setTheme(current);  
    }

    toggleBtn.addEventListener("change", () => {
        const theme = toggleBtn.checked ? "dark" : "light";
        setTheme(theme);
    });

    init();
}

