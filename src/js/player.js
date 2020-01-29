document.addEventListener("DOMContentLoaded", () => {
    // finder ID i url
    const prams = new URLSearchParams(window.location.search);
    const ID = prams.get('id');
    /* laver url */
    const URL = `https://api.spotify.com/v1/audio-features/${ID}`;
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
            }
        });
});