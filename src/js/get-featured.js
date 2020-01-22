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
            console.log("resultat", resultat);

            if (resultat.error === true) {
                createToken()
            } else {
                resultat.playlists.items.forEach(element => {
                    /*  Template Variabler */
                    const container = document.getElementById("featured-items-container");
                    const template = document.getElementById("featured-items");
                    const clone = template.content.cloneNode(true);
                    /* Erstatter data */
                    clone.getElementById("link").href = element.external_urls.spotify
                    // clone.getElementById("link").href = element.external_urls.spotify
                    clone.querySelector(".featured__item__img").src = element.images[0].url;
                    // clone.querySelector(".featured__item__text-container__title").innerText = element.name
                    // clone.querySelector(".featured__item__text-container__paragraph").innerText = element.name
                    /* Tilføjer clone */
                    container.appendChild(clone);
                });

                /* ------------------------------------------------------------ */
                console.log(resultat)
                console.log("playlists items", resultat.playlists.items)
                resultat.playlists.items.forEach(element => {
                    console.log(element.name);
                });
            }
        });
});





