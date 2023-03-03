'use strict';

const rotateColorBtn = document.getElementById("rotateColorBtn");
const changeTextBtn = document.getElementById("changeTextBtn");
const accountState = document.getElementById("accountState");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal")

function toggleModalAndOverlay() {
    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")

}

closeModalBtn.addEventListener("click", toggleModalAndOverlay)
overlay.addEventListener("click", toggleModalAndOverlay)

rotateColorBtn.addEventListener("click", function (e) {

    chrome.runtime.sendMessage({
        message: "from-popup-toggle-colors"
    },
        response => {
            console.log(response);
        }
    )

})

changeTextBtn.addEventListener("click", function (e) {
    chrome.runtime.sendMessage({
        message: "from-popup-change-text"
    },
        response => {
            if (response.message.includes("success")) toggleModalAndOverlay()
        }
    )

})


accountState.addEventListener("click", function (e) {
    console.log("activate extension");

})