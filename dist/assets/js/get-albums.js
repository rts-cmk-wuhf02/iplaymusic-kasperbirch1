"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // finder ID i url
  var prams = new URLSearchParams(window.location.search);
  var ID = prams.get('id');
  /* laver url */

  var URL = "https://api.spotify.com/v1/artists/".concat(ID, "/albums");
  var ACCESSTOKEN = sessionStorage.getItem('token');
  /* push variabel */

  var albumsClearArray = []; // console.log("albumsClearArray", albumsClearArray);

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
      // console.log("resultat", resultat.items);
      resultat.items.forEach(function (element) {
        // console.log("element", element);

        /* sletter dubletterne */
        if (!albumsClearArray.includes(element.name)) {
          albumsClearArray.push(element.name);
          /* variabler */

          var container = document.querySelector("#album-container");
          var template = document.querySelector("#album");
          var clone = template.content.cloneNode(true);
          /* Erstatter data */

          clone.querySelector("div").style.backgroundImage = "url('".concat(element.images[1].url, "')");
          clone.querySelector("div").setAttribute("albumID", element.id);
          /* Tilføjer clone */

          container.appendChild(clone);
        }
      });
      /* get albums track */

      var allAlbumsBtn = document.querySelectorAll(".get-album-tracks");
      allAlbumsBtn.forEach(function (element) {
        element.addEventListener("click", function () {
          var ID = element.getAttribute("albumID");
          getAlbumTracks(ID);
        });
      });
    }

    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: '.swiper-pagination'
      }
    });
  });

  function getAlbumTracks(ID) {
    var container = document.querySelector(".new-releases-container");
    container.innerHTML = '<div class="loading"></div>';
    console.log("clicked", ID);
    fetch("https://api.spotify.com/v1/albums/".concat(ID, "/tracks"), {
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
        spinner.parentNode.removeChild(spinner);
        console.log("resultat", resultat);
        resultat.items.forEach(function (element) {
          console.log(element.name);
          /* calc time: MS to MIN */

          var time = element.duration_ms / 60000;
          /*  Template Variabler */

          var container = document.querySelector(".new-releases-container");
          var template = document.querySelector("#songs-list-items");
          var clone = template.content.cloneNode(true);
          /* Erstatter data */

          clone.querySelector(".song-title").innerText = element.name;
          clone.querySelector(".song-Artist").innerText = element.artists[0].name;
          clone.querySelector(".song-time").innerText = "".concat(time.toFixed(2));
          /* link */

          clone.querySelector("#player-link-btn").href = "/player?id=".concat(element.id);
          clone.querySelector("#player-link").href = "/player?id=".concat(element.id);
          clone.querySelector("#artist-link").href = "/albums?id=".concat(element.artists[0].id);
          /* Tilføjer clone */

          container.appendChild(clone);
        });
      }
    });
  }
});