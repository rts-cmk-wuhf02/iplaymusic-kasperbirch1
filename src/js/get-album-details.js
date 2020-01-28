/*  Template Variabler */
const container = document.getElementById("featured-items-container");
const template = document.getElementById("featured-items");
const clone = template.content.cloneNode(true);
 /* Erstatter data */document.addEventListener("DOMContentLoaded", () => {
    // finder ID i url
    const prams = new URLSearchParams(window.location.search);
    const ID = prams.get('id');
    console.log("ID:", ID)
    /* laver url */
    const URL = `https://api.spotify.com/v1/playlists/${ID}`;
    const ACCESSTOKEN = sessionStorage.getItem('token');

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
            if (resultat.error && resultat.error.status === 401) {
                createToken()
            } else {
                // console.log("resultat", resultat.tracks.items);
                resultat.tracks.items.forEach(element => {
                    console.log("track:", element.track.name);
                    console.log("artist:", element.track.artists[0].name);
                    /* hero container */
                    const heroContainer = document.getElementById(".album-details-hero");
                    // heroContainer.style.backgroundImage = `url('${}')`
                });
            }
        });
});