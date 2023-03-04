chrome.runtime.onInstalled.addListener(async function (details) {

    if (details.reason === "install") {

        chrome.storage.local.set({ bgColor: "black" })


        let res = await chrome.storage.local.get(["bgColor"])

        console.log(res);
    }

})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.message === "from options-activate") {
        sendResponse({
            message: "from options activation success"
        })

    }

    else if (request.message === "from-popup-toggle-colors") {

        const randomIndex = getRandomInt(0, colorValues.length - 1)

        sendResponse({
            message: "from popup toggle color success",
            value: colorValues[randomIndex]

        })
    }

    else if (request.message === "from-popup-change-text") {
        //check if user is a premium user and then 
        //do the quote extractor api call and send the appropriate response


        sendResponse({
            message: "from popup success"
        })
    }

    else if (request.message === "from-popup-activate-extension") {
        //open order page for user to buy package

        sendResponse({
            message: "activation success"
        })
    }
    else {

        sendResponse({
            message: "fail"
        })

    }


    return true


})

//does not work with my subdomain. Works with localhost tho
chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {

        // console.log(request);
        // console.log(sender);

        sendResponse({ message: "external webpage communication success" })
    });

function openTab() {
    chrome.tabs.create({
        url: "popup/popup.html"
    })
}


function getQuotes() {
    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const colorValues = ["red", "blue", "green", "black", "yellow", "cyan"]
