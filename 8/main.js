const win = window;
const doc = document;
const serMsg = doc.getElementsByClassName("service-message")[0];
const popup = doc.getElementsByClassName("popup")[0];
const infForUsr = doc.getElementsByClassName("infoForUser")[0];

win.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = doc.getElementsByClassName("openPopup")[0];
    const popupCloseButton = doc.getElementsByClassName("closePopup")[0];
    const sendInfoButton = doc.getElementsByClassName("sendButton")[0];
    popupOpenButton.addEventListener("click", function() {
        openPopup();
    });
    addEventListener("popstate", function() {
        closePopup();
    });
    popupCloseButton.addEventListener("click", function() {
        closePopup();
    });
    sendInfoButton.addEventListener("click", function(event) {
        event.preventDefault();
        var resultOfCheck = checkForm();
        if (resultOfCheck) {
            serMsg.style.display = "none";
            submitForm();

        } else {
            serMsg.style.display = "block";
        }
    });
});

function openPopup() {
    history.pushState(null, null, '#popupForm');
    popup.style.display = "block";
    insertLastInformation();
}

function closePopup() {
    popup.style.display = "none";
    history.pushState(null, null, '/8');
}

function checkForm() {
    var reqFormElems = doc.getElementsByClassName("requiredFormElement");
    var chckFormElem = doc.getElementsByClassName("checkFormElement")[0];
    var checkbox = chckFormElem.getElementsByTagName("input")[0];
    var elem = 0;
    var input;
    var inputName;
    var regExp;
    serMsg.innerHTML = "";
    for (elem; elem < reqFormElems.length; elem++) {
        input = reqFormElems[elem].getElementsByTagName("input")[0];
        inputName = input.getAttribute("name");
        inputValue = input.value;
        if (inputValue.match(/^$/)) {
            serMsg.innerHTML = "* - поля обязательные к заполнению";
            return false;
        }
        if (inputName === "phoneNumber") {
            if (inputValue.match(/[^0-9]/)) {
                serMsg.innerHTML = "Поле: Телефон, заполнено некорректно";
                return false;
            }
        } else if (inputName === "email") {
            regExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/;
            if (!inputValue.match(regExp)) {
                serMsg.innerHTML = "Поле: E-mail, заполнено некорректно";
                return false;
            }
        }
    }
    if (!checkbox.checked) {
        serMsg.innerHTML = "Укажите согласие с нашей политикой";
        return false;
    }
    return true;
}

function submitForm() {
    const formData = {
        fullName: doc.getElementsByName("fullName")[0].value,
        email: doc.getElementsByName("email")[0].value,
        phoneNumber: doc.getElementsByName("phoneNumber")[0].value,
        organization: doc.getElementsByName("organization")[0].value,
        message: doc.getElementsByName("message")[0].value,
        check: doc.getElementsByName("check")[0].checked,
    };
    var slapform = new Slapform();
    slapform.submit({
        form: '6iAdlxl4o9',
        data: formData,
    })
    .then(function (response) {
        console.log('Success', response);
        alert("Форма была успешно отправлена на сервер");
        clearForm();
    })
    .catch(function (e) {
        console.error('Fail', e);
        alert("При отправлении формы на сервер возникла ошибка");
    })
}

function clearForm() {
    saveValuesFromForm();
    const popup = doc.getElementsByClassName("popup")[0];
    const popupElems = popup.getElementsByClassName("textElement");
    const popupCheckbox = popup.getElementsByClassName("checkFormElement")[0];
    var elem = 0;
    var elemInput;
    for (elem; elem < popupElems.length; elem++) {
        if (elem !== 4) {
            elemInput = popupElems[elem].getElementsByTagName("input")[0];
        } else {
            elemInput = popupElems[elem].getElementsByTagName("textarea")[0];
        }
        elemInput.value = "";
    }
    popupCheckbox.getElementsByTagName("input")[0].checked = false;
}

function saveValuesFromForm() {
    const elements = popup.getElementsByClassName("textElement");
    var element;
    for (let i = 0; i < elements.length; i++) {
        if (i !== 4) {
            element = elements[i].getElementsByTagName("input")[0];
        } else {
            element = elements[i].getElementsByTagName("textarea")[0];
        }
        localStorage.setItem(element.name, element.value);
    }
}

function insertLastInformation() {
    const elements = popup.getElementsByClassName("textElement");
    var element;
    for (let i = 0; i < elements.length; i++) {
        if (i !== 4) {
            element = elements[i].getElementsByTagName("input")[0];
        } else {
            element = elements[i].getElementsByTagName("textarea")[0];
        }
        element.value = localStorage.getItem(element.name); 
    }
    localStorage.clear();
}