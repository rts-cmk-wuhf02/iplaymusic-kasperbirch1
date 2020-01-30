"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* array med farver */
  var colors = ["#E54028", "#D70060", "#F18D05", '#FF6633', '#FF33FF', '#00B3E6', '#E6B333', '#3366E6', '#80B300', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#4D8000', '#CC80CC', '#991AFF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#00E680', '#E6FF80', '#1AFF33', '#999933'];
  var URL = "https://api.spotify.com/v1/browse/categories";
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
      /* fjerner spinner */
      var spinner = document.querySelector(".loading");
      spinner.parentNode.removeChild(spinner); // console.log("resultat", resultat.categories.items);

      resultat.categories.items.forEach(function (element, index) {
        /*  variabler */
        var container = document.querySelector('#categories');
        var categoriesItems = document.querySelector('#categories-items').content.cloneNode(true);
        var categoriesUL = categoriesItems.querySelector('ul');
        /*  print   */

        categoriesItems.querySelector('.categories__title').innerText = element.name;
        categoriesItems.querySelector(".categories-title-container").style.backgroundColor = colors[index];
        /* open / close  */

        categoriesItems.querySelector(".categories-title-container").addEventListener("click", function () {
          categoriesUL.classList.toggle("open");
        });
        /* sublist */

        var ID = element.id; // console.log("ID", ID);

        fetch("https://api.spotify.com/v1/browse/categories/".concat(ID, "/playlists"), {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": ACCESSTOKEN
          }
        }).then(function (respons) {
          return respons.json();
        }).then(function (subResultat) {
          console.log("subResultat", subResultat.playlists.items);
          subResultat.playlists.items.forEach(function (element) {
            /*  variabler */
            var subCategoriesItems = document.querySelector('#sub-categories-items').content.cloneNode(true);
            var categoriesLINK = subCategoriesItems.querySelector('li a');
            true;
            /*  print   */

            categoriesLINK.innerText = element.name;
            categoriesLINK.href = "/album-details/?id=".concat(element.id);
            /* tilføjer til UL */

            categoriesUL.appendChild(subCategoriesItems);
          });
          /* tilføjer til container  */

          container.appendChild(categoriesItems);
        });
      });
    }
  });
});