const activateBtn = document.getElementById("activateBtn");

activateBtn.addEventListener("click", function (e) {
    chrome.runtime.sendMessage({
        message: "from-options-activate"
    },
        response => {
            console.log(response);
        }
    )

})