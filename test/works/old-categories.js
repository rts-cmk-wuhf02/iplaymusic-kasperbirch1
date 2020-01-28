document.addEventListener("DOMContentLoaded", () => {
    /* array med farver */
    const colors = ["#E54028", "#D70060", "#F18D05", '#FF6633', '#FF33FF', '#00B3E6', '#E6B333', '#3366E6', '#80B300', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#4D8000', '#CC80CC', '#991AFF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#00E680', '#E6FF80', '#1AFF33', '#999933'];
    /* ----------- */
    const URL = "https://api.spotify.com/v1/browse/categories";
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
                console.log("resultat", resultat.categories.items);
                resultat.categories.items.forEach((element, index) => {
                    /*  Template Variabler */
                    const container = document.getElementById("categoriesList");
                    const template = document.getElementById("categoriesListItems");
                    const clone = template.content.cloneNode(true);
                    /* Erstatter data */
                    clone.querySelector(".categories-title").innerText = element.name
                    clone.querySelector(".categories-title").style.backgroundColor = colors[index]

                    /////////////////////////////////////////////////////////////////////
                    const ID = element.id
                    // console.log("ID", ID);

                    fetch(`https://api.spotify.com/v1/browse/categories/${ID}/playlists`, {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": ACCESSTOKEN
                        }
                    })
                        .then((respons) => respons.json())
                        .then((subResultat) => {
                            console.log("subResultat playlists", subResultat);
                            /*               subResultat.items.forEach(element => {
                                              console.log(element)
                                          }); */
                        });
                    /////////////////////////////////////////////////////////////////////
                    /* Tilføjer clone */
                    container.appendChild(clone);
                });
            }
        });
});