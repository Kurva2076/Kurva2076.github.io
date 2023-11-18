const win = window;
const doc = document;
const serMsg = doc.getElementsByClassName("service-message")[0];
const popup = doc.getElementsByClassName("popup")[0];
const infForUsr = doc.getElementsByClassName("infoForUser")[0];

win.addEventListener("DOMContentLoaded", function () {
    const popupOpenButton = doc.getElementsByClassName("openPopup")[0];
    const popupCloseButton = doc.getElementsByClassName("closePopup")[0];
    const sendInfoButton = doc.getElementsByClassName("sendButton")[0];
    // const backButton = win.;
    popupOpenButton.addEventListener("click", function() {
        openPopup();
    });
    addEventListener("popstate", function(event) {
        // event.preventDefault();
        // console.log(history.back())
        // console.log(event.state);
        closePopup();
        // alert("FFFFF");
    });
    popupCloseButton.addEventListener("click", function() {
        // event.preventDefault();
        // console.log(event);
        closePopup();
    });
    sendInfoButton.addEventListener("click", function(event) {
        event.preventDefault();
        // var resultOfCheck = checkForm();
        // console.log(resultOfCheck);
        // if (resultOfCheck) {
        //     serMsg.style.display = "none";

        // } else {
        //     serMsg.style.display = "block";
        // }

        submitForm();
    });
});

function openPopup() {
    history.pushState(null, null, '#popupForm');
    popup.style.display = "block";
}

function closePopup() {
    popup.style.display = "none";
    history.pushState(null, null, '/8');
}

function submitForm() {
    const formData = {
        fullName: document.getElementsByName("fullName")[0].value,
        email: document.getElementsByName("email")[0].value,
        phoneNumber: document.getElementsByName("phoneNumber")[0].value,
        organization: document.getElementsByName("organization")[0].value,
        message: document.getElementsByName("message")[0].value,
        check: document.getElementsByName("check")[0].checked,
    };
    var slapform = new Slapform();
    slapform.submit({
        form: '6iAdlxl4o9',
        data: formData,
    })
        .then(function (response) {
            console.log('Success', response);
            infForUsr.innerHTML = 'Успех';
            clearForm();
        })
        .catch(function (e) {
            console.error('Fail', e);
            infForUsr.innerHTML = 'Ошибка';
        })
}

function clearForm() {
    saveValuesFromForm();
    const popup = doc.getElementsByClassName("popup")[0];
    const serMsg = popup.getElementsByClassName("service-message")[0];
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
    // serMsg.innerHTML = "";
}

function saveValuesFromForm() {
    const formValues = {};
    const elements = popup.getElementsByTagName("form")[0].elements;    

    for (let i = 0; i < elements.length - 2; i++) {
        const element = elements[i];
        console.log(element);
        if (element.name) {
            formValues[element.name] = element.value;
        }
    }

    console.log(formValues);

    localStorage.setItem('formValues', JSON.stringify(formValues));
}

























// function checkForm() {
//     var areRequiredFieldsFilled = true;
//     var reqFormElems = doc.getElementsByClassName("requiredFormElement");
//     var elem = 0;
//     var input;
//     var inputName;
//     for (elem; elem < reqFormElems.length; elem++) {
//         input = reqFormElems[elem].getElementsByTagName("input")[0];
//         inputName = input.getAttribute("name");
//         inputValue = input.value;
//         console.log(inputName);
//         if (inputValue.match(/^$/)) {
//             servMs = doc.getElementsByClassName("service-message")[0];
//             servMs.innerHTML = "* - поля обязательные к заполнению";
//             return false;
//         }
//         // if (inputName === "fullName" || inputName === "organization") {
            
//         // } else if (inputName === "phoneNumber") {

//         // }
//     }
// }