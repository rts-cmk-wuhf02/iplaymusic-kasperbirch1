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

            if (resultat.error = 401) {
                createToken()
            } else {
                console.log(resultat)
                console.log(resultat.playlists.items)
                resultat.playlists.items.forEach(element => {
                    console.log(element.name);
                });
            }
        });
});