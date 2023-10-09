window.addEventListener('DOMContentLoaded', function (event) {
    document.getElementsByName('send_button')[0].addEventListener('click', checkForm);
});

function checkForm(event)
{
    event.preventDefault();
    
    const form = document.getElementById('main-form');
    
    const product = form.product_select.value;
    const count = form.product_count.value;

    console.log(count.match(/[^0-9]/));

    // const fail = (product == "" && count == 0) ? "Заполните все поля" : 
    // ((product == "") ? "Товар не выбран" : 
    // ((count == 0) ? "Количество товара не введено" : 
    // ((isNaN(count)) ? "Количество товара введено некорректно" : "")));
    // let fail = "";
    // if (product == "" && isNaN(count))
    //     fail = "Заполните все поля";
    // else if (product == "")
    //     fail = "Товар не выбран";
    // else if (isNaN(count))
    //     fail = "Количество товара введено некорректно";

    if (count.match(/[^0-9]/) && product == "")
    {
        document.getElementsByClassName('error')[0].innerHTML = "Заполните все поля";
    }
    else if (count.match(/[^0-9]/))
    {
        document.getElementsByClassName('error')[0].innerHTML = "Количество товара введено некорректно";
    }
    else if (product == "")
    {
        document.getElementsByClassName('error')[0].innerHTML = "Товар не выбран";
    }
    else
    {
        count = parseInt(count);
        let price;
        switch (product)
        {
            case "playstation-5":
                price = 62857;
                break;
            case "xbox-360":
                price = 52372;
                break;
            case "iphone-15":
                price = 97365;
                break;
            case "macbook-pro-16":
                price = 402648;
                break;
            case "tesla-model-x":
                price = 14490000;
                break;
            case "geforce-rtx-4090":
                price = 191156;
                break;
            case "rock":
                price = 1837362834;
                break;
        }
        let total_price = count*price;
        document.getElementsByClassName('final_price')[0].innerHTML = "Итоговая цена: " + total_price + " $";
    }
}

// var window = window;
// var document = document;
// var price;

// window.addEventListener("DOMContentLoaded", function (event) {
//     document.getElementsByName("send_button")[0].addEventListener("click",
//                                                                   checkForm);
// });

// function checkForm(event)
// {
//     event.preventDefault();
//     const form = document.getElementById("main-form");
//     const product = form.product_select.value;
//     const count = Number(form.product_count.value);
//     var fail = "";
//     if (product === "" && count === 0) {fail = "Заполните все поля";}
//     else if (product === ""){fail = "Товар не выбран";}
//     else if (count === 0) {fail = "Количество товара не введено";}
//     else if (Number.isNaN(count))
//         {fail = "Количество товара введено некорректно";}
//     if (fail !== "")
//     {document.getElementsByClassName("error")[0].innerHTML = fail;}
//     else
//     {
//         switch (product)
//         {
//             case "playstation-5":
//                 price = 62857;
//                 break;
//             case "xbox-360":
//                 price = 52372;
//                 break;
//             case "iphone-15":
//                 price = 97365;
//                 break;
//             case "macbook-pro-16":
//                 price = 402648;
//                 break;
//             case "tesla-model-x":
//                 price = 14490000;
//                 break;
//             case "geforce-rtx-4090":
//                 price = 191156;
//                 break;
//             case "rock":
//                 price = 1837362834;
//                 break;
//         }
//         document.getElementsByClassName("final_price")[0].innerHTML =
//              "Итоговая цена: " + count * price + " $";
//     }
// }
