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
    // console.log("resultat", resultat.error.status);
    if (resultat.error && resultat.error.status === 401) {
      console.log("hey!");
      createToken();
    } else {
      resultat.playlists.items.forEach(function (element) {
        /*  Template Variabler */
        var container = document.getElementById("featured-items-container");
        var template = document.getElementById("featured-items");
        var clone = template.content.cloneNode(true);
        /* Erstatter data */

        clone.querySelector(".featured__item__img").src = element.images[0].url;
        /* Tilføjer clone */

        container.appendChild(clone);
      });
      /* ------------------------------------------------------------ */
      // console.log(resultat)
      // console.log("playlists items", resultat.playlists.items)
      // resultat.playlists.items.forEach(element => {
      //     console.log(element.name);
      // });
    }
  });
});