const toggleThemeBtn = document.getElementById("toggleTheme");
const themeInfo = document.getElementById("themeInfo");
const savedTheme = localStorage.getItem("theme");

if (!savedTheme && window.matchMedia(("(prefers-color-scheme: dark)").matches) || savedTheme == "dark") {
    document.body.classList.add("dark-mode");
    themeInfo.innerHTML = "Dark Theme";
    toggleThemeBtn.checked = true;
    localStorage.setItem("theme", "dark");
}

toggleThemeBtn.addEventListener("change", () => {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        themeInfo.innerHTML = "Light Theme";
        document.body.classList.remove("neon-mode");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        themeInfo.innerHTML = "Dark Theme";
    }
});