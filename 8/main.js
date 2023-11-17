var window = window;
var document = document;

window.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = document.getElementsByClassName("openPopup")[0];
    popupOpenButton.addEventListener("click", function() {
        openPopup();
    });
});

function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}