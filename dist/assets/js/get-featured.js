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
    if (resultat.error = 401) {
      createToken();
    } else {
      console.log(resultat);
      console.log(resultat.playlists.items);
      resultat.playlists.items.forEach(function (element) {
        console.log(element.name);
      });
    }
  });
});