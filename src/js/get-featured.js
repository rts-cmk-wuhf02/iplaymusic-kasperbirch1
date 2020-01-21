document.addEventListener("DOMContentLoaded", () => {
    const URL = "https://api.spotify.com/v1/browse/categories";
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
            console.log(resultat)
            console.log("resultat.categories.items", resultat.categories.items)
            resultat.categories.items.forEach(element => {
                console.log(element);


            });
        });
});