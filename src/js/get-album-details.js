document.addEventListener("DOMContentLoaded", () => {

    // finder category i url
    const prams = new URLSearchParams(window.location.search);
    const ID = prams.get('id');
    console.log("ID:", ID)

    const URL = `https://api.spotify.com/v1/browse/categories/${ID}/playlists`;
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

            if (resultat.error && resultat.error.status === 401) {
                createToken()
            } else {

            }
        });


});