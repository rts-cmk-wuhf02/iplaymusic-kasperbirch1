"use strict";

/*  Template Variabler */
var container = document.getElementById("featured-items-container");
var template = document.getElementById("featured-items");
var clone = template.content.cloneNode(true);
/* Erstatter data */

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
      // console.log("resultat", resultat.tracks.items);
      resultat.tracks.items.forEach(function (element) {
        console.log("track:", element.track.name);
        console.log("artist:", element.track.artists[0].name);
        /* hero container */

        var heroContainer = document.getElementById(".album-details-hero"); // heroContainer.style.backgroundImage = `url('${}')`
      });
    }
  });
});