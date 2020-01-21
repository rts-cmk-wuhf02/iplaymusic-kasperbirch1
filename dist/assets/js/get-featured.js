"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var URL = "https://api.spotify.com/v1/browse/categories";
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
    console.log(resultat);
    console.log("resultat.categories.items", resultat.categories.items);
    resultat.categories.items.forEach(function (element) {
      console.log(element);
    });
  });
});