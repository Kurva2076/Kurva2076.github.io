var win = window;
var doc = document;

win.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = doc.getElementsByClassName("openPopup")[0];
    const popupCloseButton = doc.getElementsByClassName("closePopup")[0];
    const sendInfoButton = doc.getElementsByClassName("sendButton")[0];
    popupOpenButton.addEventListener("click", function() {
        openPopup();
    });
    popupCloseButton.addEventListener("click", function() {
        closePopup();
    });
    sendInfoButton.addEventListener("click", function(event) {
        event.preventDefault();
        var resultOfCheck = checkForm();
        console.log(resultOfCheck);
        if (resultOfCheck) {
            var serMsg = doc.getElementsByClassName("service-message")[0];
            serMsg.style.display = "none";

        } else {
            var serMsg = doc.getElementsByClassName("service-message")[0];
            serMsg.style.display = "block";
        }
    });
});

function openPopup() {
    history.pushState(null, null, "form");
    const popup = doc.getElementsByClassName("popup")[0];
    popup.style.display = "block";
}

function closePopup() {
    const popup = doc.getElementsByClassName("popup")[0];
    const serMsg = popup.getElementsByClassName("service-message")[0];
    const popupElems = popup.getElementsByClassName("textElement");
    const popupCheckbox = popup.getElementsByClassName("checkFormElement")[0];
    var elem = 0;
    var elemInput;
    popup.style.display = "none";
    for (elem; elem < popupElems.length; elem++) {
        if (elem !== 4) {
            elemInput = popupElems[elem].getElementsByTagName("input")[0];
        } else {
            elemInput = popupElems[elem].getElementsByTagName("textarea")[0];
        }
        elemInput.value = "";
    }
    popupCheckbox.getElementsByTagName("input")[0].checked = false;
    serMsg.innerHTML = "";
    serMsg.style.display = "none";
}

function checkForm() {
    var areRequiredFieldsFilled = true;
    var reqFormElems = doc.getElementsByClassName("requiredFormElement");
    var elem = 0;
    var input;
    var inputName;
    for (elem; elem < reqFormElems.length; elem++) {
        input = reqFormElems[elem].getElementsByTagName("input")[0];
        inputName = input.getAttribute("name");
        inputValue = input.value;
        console.log(inputName);
        if (inputValue.match(/^$/)) {
            servMs = doc.getElementsByClassName("service-message")[0];
            servMs.innerHTML = "* - поля обязательные к заполнению";
            return false;
        }
        // if (inputName === "fullName" || inputName === "organization") {
            
        // } else if (inputName === "phoneNumber") {

        // }
    }
}