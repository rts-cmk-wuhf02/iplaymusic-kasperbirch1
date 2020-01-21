document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    /* getToken and save ind sesision storage  */
    (function getToken() {
        const clientId = "dc0f55f09fdf4d578243f12ea258e145";
        const ClientSecret = "5b2c30afe4c949feba3eab6f83b60973";

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(clientId + ":" + ClientSecret)
            },
            body: "grant_type=client_credentials"
        })
            .then(respons => respons.json())
            .then(resultat => sessionStorage.setItem('token', `Bearer ${resultat.access_token}`))
    })()


    /* fetch data  */
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

})
