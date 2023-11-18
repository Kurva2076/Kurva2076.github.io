const win = window;
const doc = document;
const his = history;
const con = console;
const serMsg = doc.getElementsByClassName("service-message")[0];
const popup = doc.getElementsByClassName("popup")[0];
const infForUsr = doc.getElementsByClassName("infoForUser")[0];

win.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = doc.getElementsByClassName("openPopup")[0];
    const popupCloseButton = doc.getElementsByClassName("closePopup")[0];
    const sendInfoButton = doc.getElementsByClassName("sendButton")[0];
    popupOpenButton.addEventListener("click", function () {
        openPopup();
    });
    win.addEventListener("popstate", function () {
        closePopup();
    });
    popupCloseButton.addEventListener("click", function () {
        closePopup();
    });
    sendInfoButton.addEventListener("click", function (event) {
        var resultOfCheck = checkForm();
        event.preventDefault();
        if (resultOfCheck) {
            serMsg.style.display = "none";
            submitForm();

        } else {
            serMsg.style.display = "block";
        }
    });
});

function openPopup() {
    his.pushState(null, null, "#popupForm");
    popup.style.display = "block";
    insertLastInformation();
}

function closePopup() {
    popup.style.display = "none";
    his.pushState(null, null, "/8");
}

function checkForm() {
    var reqFormElems = doc.getElementsByClassName("requiredFormElement");
    var chckFormElem = doc.getElementsByClassName("checkFormElement")[0];
    var checkbox = chckFormElem.getElementsByTagName("input")[0];
    var elem;
    var input;
    var inputName;
    var inputValue;
    var regExp;
    serMsg.innerHTML = "";
    for (elem = 0; elem < reqFormElems.length; elem += 1) {
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
            regExp = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]/;
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
        check: doc.getElementsByName("check")[0].checked,
        email: doc.getElementsByName("email")[0].value,
        fullName: doc.getElementsByName("fullName")[0].value,
        message: doc.getElementsByName("message")[0].value,
        organization: doc.getElementsByName("organization")[0].value,
        phoneNumber: doc.getElementsByName("phoneNumber")[0].value
    };
    var slapform = new Slapform();
    slapform.submit({
        data: formData,
        form: "JyQHnUCei"
    }).then(function (response) {
        con.log("Success", response);
        win.alert("Форма была успешно отправлена на сервер");
        clearForm();
    }).catch(function (e) {
        con.error("Fail", e);
        win.alert("При отправлении формы на сервер возникла ошибка");
    });
}

function clearForm() {
    saveValuesFromForm();
    const popupElems = popup.getElementsByClassName("textElement");
    const popupCheckbox = popup.getElementsByClassName("checkFormElement")[0];
    var elem;
    var elemInput;
    for (elem = 0; elem < popupElems.length; elem += 1) {
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
    var i;
    for (i = 0; i < elements.length; i += 1) {
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
    var i;
    for (i = 0; i < elements.length; i += 1) {
        if (i !== 4) {
            element = elements[i].getElementsByTagName("input")[0];
        } else {
            element = elements[i].getElementsByTagName("textarea")[0];
        }
        element.value = localStorage.getItem(element.name);
    }
    localStorage.clear();
}
