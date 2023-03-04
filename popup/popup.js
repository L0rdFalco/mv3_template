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

rotateColorBtn.addEventListener("click", async function (e) {

    const res = await chrome.runtime.sendMessage({
        message: "from-popup-toggle-colors"
    })

    console.log(res);

    if (res.message === "from popup toggle color success") {
        chrome.storage.local.set({ bgColor: res.value })
    }

})

changeTextBtn.addEventListener("click", async function (e) {
    const res = await chrome.runtime.sendMessage({
        message: "from-popup-change-text"
    })

    if (res.message.includes("success")) toggleModalAndOverlay()


})


accountState.addEventListener("click", async function (e) {
    console.log("activate extension");

    const res = await chrome.runtime.sendMessage({
        message: "from-popup-activate-extension"
    })

})