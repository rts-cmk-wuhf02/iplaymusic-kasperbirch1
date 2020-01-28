document.addEventListener("DOMContentLoaded", () => {
    /* array med farver */
    const colors = ["#E54028", "#D70060", "#F18D05", '#FF6633', '#FF33FF', '#00B3E6', '#E6B333', '#3366E6', '#80B300', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#4D8000', '#CC80CC', '#991AFF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#00E680', '#E6FF80', '#1AFF33', '#999933'];
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
                // console.log("resultat", resultat.categories.items);
                resultat.categories.items.forEach((element, index) => {
                    /*  variabler */
                    const container = document.querySelector('#categories');
                    const categoriesItems = document.querySelector('#categories-items').content.cloneNode(true);
                    const categoriesUL = categoriesItems.querySelector('ul');
                    /*  print   */
                    categoriesItems.querySelector('.categories__title').innerText = element.name
                    categoriesItems.querySelector(".categories-title-container").style.backgroundColor = colors[index]
                    /* open / close  */
                    categoriesItems.querySelector(".categories-title-container").addEventListener("click", function () {
                        categoriesUL.classList.toggle("open");
                    });
                    /* sublist */
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
                            console.log("subResultat", subResultat.playlists.items);
                            subResultat.playlists.items.forEach(element => {
                                /*  variabler */
                                const subCategoriesItems = document.querySelector('#sub-categories-items').content.cloneNode(true);
                                const categoriesLINK = subCategoriesItems.querySelector('li a'); true
                                /*  print   */
                                categoriesLINK.innerText = element.name
                                categoriesLINK.href = `/album-details/?id=${element.id}`
                                /* tilføjer til UL */
                                categoriesUL.appendChild(subCategoriesItems);
                            })
                            /* tilføjer til container  */
                            container.appendChild(categoriesItems);
                        });
                });
            }
        });
});