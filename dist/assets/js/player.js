"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // finder ID i url
  var prams = new URLSearchParams(window.location.search);
  var ID = prams.get('id');
  /* laver url */

  var URL = "https://api.spotify.com/v1/audio-features/".concat(ID);
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
    }
  });
});