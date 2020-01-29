"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // finder ID i url
  var prams = new URLSearchParams(window.location.search);
  var ID = prams.get('id');
  console.log("ID:", ID);
  /* laver url */

  var URL = "https://api.spotify.com/v1/playlists/".concat(ID);
  var ACCESSTOKEN = sessionStorage.getItem('token');
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
    if (resultat.error && resultat.error.status === 401) {
      createToken();
    } else {
      console.log("resultat", resultat);
      /* hero container */

      var heroContainer = document.querySelector(".album-details-hero");
      heroContainer.style.backgroundImage = "url('".concat(resultat.images[0].url, "')");
      /*  */

      resultat.tracks.items.forEach(function (element) {
        /* calc time: MS to MIN */
        var time = element.track.duration_ms / 60000;
        /*  Template Variabler */

        var container = document.querySelector(".songs-list");
        var template = document.querySelector("#songs-list-items");
        var clone = template.content.cloneNode(true);
        /* Erstatter data */

        clone.querySelector(".song-title").innerText = element.track.name;
        clone.querySelector(".song-Artist").innerText = element.track.artists[0].name;
        clone.querySelector(".song-time").innerText = "".concat(time.toFixed(2));
        /* link */

        clone.querySelector("a").href = "/player?id=".concat(element.track.id);
        /* Tilføjer clone */

        container.appendChild(clone);
      });
    }
  });
});