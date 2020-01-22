"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var URL = "https://api.spotify.com/v1/browse/featured-playlists";
  var ACCESSTOKEN = sessionStorage.getItem('token');
  console.log("ACCESSTOKEN", ACCESSTOKEN);
  fetch(URL, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": ACCESSTOKEN
    }
  }).then(function (respons) {
    return respons.json();
  }).then(function (resultat) {
    console.log("resultat", resultat);

    if (resultat.error === true) {
      createToken();
    } else {
      resultat.playlists.items.forEach(function (element) {
        /*  Template Variabler */
        var container = document.getElementById("featured-items-container");
        var template = document.getElementById("featured-items");
        var clone = template.content.cloneNode(true);
        /* Erstatter data */

        clone.getElementById("link").href = element.external_urls.spotify; // clone.getElementById("link").href = element.external_urls.spotify

        clone.querySelector(".featured__item__img").src = element.images[0].url; // clone.querySelector(".featured__item__text-container__title").innerText = element.name
        // clone.querySelector(".featured__item__text-container__paragraph").innerText = element.name

        /* Tilføjer clone */

        container.appendChild(clone);
      });
      /* ------------------------------------------------------------ */

      console.log(resultat);
      console.log("playlists items", resultat.playlists.items);
      resultat.playlists.items.forEach(function (element) {
        console.log(element.name);
      });
    }
  });
});