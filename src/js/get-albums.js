document.addEventListener("DOMContentLoaded", () => {
    // finder ID i url
    const prams = new URLSearchParams(window.location.search);
    const ID = prams.get('id');
    /* laver url */
    const URL = `https://api.spotify.com/v1/artists/${ID}/albums`;
    const ACCESSTOKEN = sessionStorage.getItem('token');
    /* push variabel */
    const albumsClearArray = [];
    // console.log("albumsClearArray", albumsClearArray);

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
                // console.log("resultat", resultat.items);
                resultat.items.forEach(element => {
                    // console.log("element", element);

                    /* sletter dubletterne */
                    if (!albumsClearArray.includes(element.name)) {
                        albumsClearArray.push(element.name)
                        /* variabler */
                        const container = document.querySelector("#album-container");
                        const template = document.querySelector("#album");
                        const clone = template.content.cloneNode(true);
                        /* Erstatter data */
                        clone.querySelector("div").style.backgroundImage = `url('${element.images[1].url}')`;
                        clone.querySelector("div").setAttribute("albumID", element.id)
                        /* Tilføjer clone */
                        container.appendChild(clone);
                    }
                });

                /* get albums track */
                const allAlbumsBtn = document.querySelectorAll(".get-album-tracks");
                allAlbumsBtn.forEach(element => {
                    element.addEventListener("click", () => {
                        const ID = element.getAttribute("albumID")
                        getAlbumTracks(ID)
                    })
                });


            }
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        });

    function getAlbumTracks(ID) {
        const container = document.querySelector(".new-releases-container");
        container.innerHTML = '<div class="loading"></div>'

        console.log("clicked", ID);
        fetch(`https://api.spotify.com/v1/albums/${ID}/tracks`, {
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
                    /* fjerner spinner */
                    const spinner = document.querySelector(".loading")
                    spinner.parentNode.removeChild(spinner);
                    console.log("resultat", resultat);
                    resultat.items.forEach(element => {
                        console.log(element.name);
                        /* calc time: MS to MIN */
                        const time = element.duration_ms / 60000
                        /*  Template Variabler */
                        const container = document.querySelector(".new-releases-container");
                        const template = document.querySelector("#songs-list-items");
                        const clone = template.content.cloneNode(true);
                        /* Erstatter data */
                        clone.querySelector(".song-title").innerText = element.name
                        clone.querySelector(".song-Artist").innerText = element.artists[0].name
                        clone.querySelector(".song-time").innerText = `${time.toFixed(2)}`
                        /* link */
                        clone.querySelector("#player-link-btn").href = `/player?id=${element.id}`
                        clone.querySelector("#player-link").href = `/player?id=${element.id}`
                        clone.querySelector("#artist-link").href = `/albums?id=${element.artists[0].id}`
                        /* Tilføjer clone */
                        container.appendChild(clone);
                    });
                }
            });
    }
});