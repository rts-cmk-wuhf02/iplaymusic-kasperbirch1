document.addEventListener("DOMContentLoaded", () => {
    const URL = "https://api.spotify.com/v1/browse/featured-playlists";
    const ACCESSTOKEN = sessionStorage.getItem('token');
    console.log("ACCESSTOKEN", ACCESSTOKEN);

    fetch(URL, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": ACCESSTOKEN
        }
    })
        .then((respons) => respons.json())
        .then((resultat) => {
            // console.log("resultat", resultat.error.status);
            if (resultat.error && resultat.error.status === 401) {
                console.log("hey!")
                createToken()
            } else {
                resultat.playlists.items.forEach(element => {
                    /*  Template Variabler */
                    const container = document.getElementById("featured-items-container");
                    const template = document.getElementById("featured-items");
                    const clone = template.content.cloneNode(true);
                    /* Erstatter data */
                    clone.querySelector("#link").href = `/album-details/?id=${element.id}`
                    clone.querySelector(".featured__item__img").src = element.images[0].url;
                    /* Tilføjer clone */
                    container.appendChild(clone);
                });
            }
        });
});





