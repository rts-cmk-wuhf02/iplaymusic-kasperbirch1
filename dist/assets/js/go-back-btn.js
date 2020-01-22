"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var goBackBtn = document.getElementById("goBackBtn");
  goBackBtn.addEventListener("click", function () {
    window.history.back();
  });
});