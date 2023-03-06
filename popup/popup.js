'use strict';

const rotateColorBtn = document.getElementById("rotateColorBtn");
const changeTextBtn = document.getElementById("changeTextBtn");
const accountState = document.getElementById("accountState");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal")

function customizeUI(uiData) {

}

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

    console.log("popup res: ", res);

    if (res.message === "not logged in") {
        const obj = {
            heading: "Premium Feature",
            message: "You are not logged in",
            btnText: "login",
            link: "/auth"
        }

        toggleModalAndOverlay(obj)

    }
    else if (res.message === "free user") {
        console.log("free user");
        let storageObj = await chrome.storage.local.get(["authToken"])

        console.log("gotten authToken ---> ", Boolean(storageObj.authToken));

        const obj = {
            heading: "Premium Feature",
            message: "please purchase a subscription to acess this feature",
            btnText: "purchase now",
            link: `/subscriptions/${storageObj.authToken}`
        }

        toggleModalAndOverlay(obj)

    }

    else if (res.message === "premium user") {
        console.log("premium user");
        let res = await chrome.storage.local.get(["randQuote"])

        console.log(res);

        document.getElementById("textId").innerText = res

    }



})


accountState.addEventListener("click", function (e) {
    console.log("activate extension");

    window.open(`http://127.0.0.1:3000${accountState.getAttribute("data-link")}`, "_blank")


})