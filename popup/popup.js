'use strict';

const rotateColorBtn = document.getElementById("rotateColorBtn");
const changeTextBtn = document.getElementById("changeTextBtn");
const accountState = document.getElementById("accountState");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal")

function toggleModalAndOverlay(messageObj) {
    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")

    document.getElementById("modalHeader").innerText = messageObj.heading
    document.getElementById("modalText").innerText = messageObj.message
    document.getElementById("accountState").innerText = messageObj.btnText
    document.getElementById("accountState").dataset.link = messageObj.link

}

closeModalBtn.addEventListener("click", toggleModalAndOverlay)
overlay.addEventListener("click", toggleModalAndOverlay)

rotateColorBtn.addEventListener("click", async function (e) {

    const res = await chrome.runtime.sendMessage({
        message: "from-popup-toggle-colors"
    })


    if (res.message === "from popup toggle color success") {
        chrome.storage.local.set({ bgColor: res.value })
    }

})

changeTextBtn.addEventListener("click", async function (e) {
    const res = await chrome.runtime.sendMessage({
        message: "from-popup-change-text"
    })

    if (res.message === "not logged in") {
        const obj = {
            heading: "Premium Feature",
            message: "You are not logged in",
            btnText: "login",
            link: "https://app-backend-gkbi.onrender.com/auth"
        }

        toggleModalAndOverlay(obj)

    }

    else if (res.message === "premium user") {
        let res = await chrome.storage.local.get(["randQuote"])

        document.getElementById("textId").innerText = res

    }

    else if (res.message === "free user") {
        let storageObj = await chrome.storage.local.get(["authToken"])

        const obj = {
            heading: "Premium Feature",
            message: "please purchase a subscription to acess this feature",
            btnText: "purchase now",
            link: `https://app-backend-gkbi.onrender.com/subscriptions/${storageObj.authToken}`
        }

        toggleModalAndOverlay(obj)

    }
    else {
        const obj = {
            heading: "problem with token",
            message: res.message,
            btnText: "log in",
            link: `https://app-backend-gkbi.onrender.com/auth`
        }

        toggleModalAndOverlay(obj)
    }

})


accountState.addEventListener("click", function (e) {

    window.open(`https://app-backend-gkbi.onrender.com/${accountState.getAttribute("data-link")}`, "_blank")


})