"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  if (sessionStorage.getItem("token") === null) {
    createToken();
  }
  /* createToken and save ind sesision storage  */


  function createToken() {
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
  }
});