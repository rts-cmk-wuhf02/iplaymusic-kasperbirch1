document.addEventListener("DOMContentLoaded", () => {
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
                console.log("resultat", resultat);
                /* hero container */
                const heroContainer = document.querySelector(".album-details-hero");
                heroContainer.style.backgroundImage = `url('${resultat.images[0].url}')`
                /*  */
                resultat.tracks.items.forEach(element => {
                    /* calc time: MS to MIN */
                    const time = element.track.duration_ms / 60000
                    /*  Template Variabler */
                    const container = document.querySelector(".songs-list");
                    const template = document.querySelector("#songs-list-items");
                    const clone = template.content.cloneNode(true);
                    /* Erstatter data */
                    clone.querySelector(".song-title").innerText = element.track.name
                    clone.querySelector(".song-Artist").innerText = element.track.artists[0].name
                    clone.querySelector(".song-time").innerText = `${time.toFixed(2)}`
                    /* link */
                    clone.querySelector("#player-link-btn").href = `/player?id=${element.track.id}`
                    clone.querySelector("#player-link").href = `/player?id=${element.track.id}`
                    clone.querySelector("#artist-link").href = `/albums?id=${element.track.artists[0].id}`
                    /* Tilføjer clone */
                    container.appendChild(clone);
                });
            }
        });
});