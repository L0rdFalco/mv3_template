chrome.runtime.onInstalled.addListener(function (details) {

    if (details.reason === "install") openTab()

})


// console.log("reason --> ", chrome.runtime.OnInstalledReason);
// console.log("id--> ", chrome.runtime.id);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.message === "from options-activate") {
        sendResponse({
            message: "from options success"
        })

    }

    else if (request.message === "from-popup-toggle-colors") {

        sendResponse({
            message: "from popup success"
        })
    }

    else if (request.message === "from-popup-change-text") {

        sendResponse({
            message: "from popup success"
        })
    }
    else {

        sendResponse({
            message: "fail"
        })

    }


    return true


})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (!tab.url
        || tab.status !== "complete"
        || !tab.url.startsWith("http")

    ) return;


    try {

        await chrome.scripting.insertCSS({
            target: {
                tabId: tabId
            },
            files: ["./content/content-style.css"]
        })

        await chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            files: ["./content/content-script.js"]
        })


    } catch (error) {
        console.log(error);
    }


})


function openTab() {
    chrome.tabs.create({
        url: "popup/popup.html"
    })
}