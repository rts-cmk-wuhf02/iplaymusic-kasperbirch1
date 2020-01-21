document.addEventListener("DOMContentLoaded", () => {

    // console.log(document.documentElement.dataset.theme);

    // Finder sidst valgte theme i localstorge
    var currentTheme = localStorage.getItem('current-theme');
    document.documentElement.setAttribute('data-theme', currentTheme);

    //  change theme 
    const changeBtn = document.querySelector(".fa-cogs");
    const bottomMenu = document.querySelector(".bottom-nav")
    console.log(bottomMenu.style.backgroundColor);

    changeBtn.addEventListener("click", () => {
        if (document.documentElement.dataset.theme == "light") {
            document.documentElement.setAttribute('data-theme', 'dark');
            // 
            changeBtn.classList.add("dark-theme-activate");
            localStorage.setItem('current-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            // 
            changeBtn.classList.remove("dark-theme-activate");
            localStorage.setItem('current-theme', 'white');
        }
    })
});
