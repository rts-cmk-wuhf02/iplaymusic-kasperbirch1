document.addEventListener("DOMContentLoaded", () => {
    const goBackBtn = document.getElementById("goBackBtn");
    goBackBtn.addEventListener("click", () => {
        window.history.back();
    })
});