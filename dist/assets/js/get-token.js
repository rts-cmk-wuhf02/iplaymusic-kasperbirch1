"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  /* getToken and save ind sesision storage  */

  (function getToken() {
    var clientId = "dc0f55f09fdf4d578243f12ea258e145";
    var ClientSecret = "5b2c30afe4c949feba3eab6f83b60973";
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(clientId + ":" + ClientSecret)
      },
      body: "grant_type=client_credentials"
    }).then(function (respons) {
      return respons.json();
    }).then(function (resultat) {
      return sessionStorage.setItem('token', "Bearer ".concat(resultat.access_token));
    });
  })();
  /* fetch data  */


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