"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  var URL = "https://jsonplaceholder.typicode.com/photos";
  fetch(URL).then(function (respons) {
    return respons.json();
  }).then(function (resultat) {
    console.log(resultat); // resultat.forEach(element => {
    // // Template Variabler
    // const container = document.querySelector("");
    // const template = document.getElementById("");
    // const clone = template.content.cloneNode(true);
    // clone.querySelector("").src = element.images[0];
    // clone.querySelector("").innerText = element.make;
    // clone.querySelector("").innerText = element.price;
    // clone.querySelector("").href = `/product/?sku=${element.sku}`;
    // // Tilføjer clone
    // container.appendChild(clone);
    // }
  });
});