"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // finder category i url
  var prams = new URLSearchParams(window.location.search);
  var ID = prams.get('id');
  console.log("ID:", ID);
  var URL = "https://api.spotify.com/v1/browse/categories/".concat(ID, "/playlists");
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

    if (resultat.error && resultat.error.status === 401) {
      createToken();
    } else {}
  });
});