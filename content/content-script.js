'use strict';


function elementInserter() {

    try {
        if (document.getElementById("info-id")) return;

        const mainDiv = document.createElement('div');
        const textDiv = document.createElement('div');

        mainDiv.classList.add("item");
        textDiv.classList.add("text");
        mainDiv.id = "info-id";
        textDiv.id = "textId";

        textDiv.innerText = "there is nothing more common than the wish to be remarkable"
        mainDiv.appendChild(textDiv);

        document.querySelector("body").insertAdjacentElement("beforebegin", mainDiv);


    }
    catch (e) {
        console.log("element insertion failed", e);

    }

}



elementInserter()



