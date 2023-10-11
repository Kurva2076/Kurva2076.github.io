var window = window;
var document = document;

window.addEventListener("DOMContentLoaded", function () {
  document.getElementsByName("send_button")[0].addEventListener(
    "click",
    checkForm
  );
});

function checkForm(event) {
  var price;
  var total_price;
  var total_message;
  event.preventDefault();
  const form = document.getElementById("main-form");
  const product = form.product_select.value;
  const count = form.product_count.value;
  if (product.match(/^$/) && count.match(/^\s*$/)) {
    document.getElementsByClassName("error")[0].innerHTML =
    "Заполните все поля";
  } else if (product.match(/^$/)) {
    document.getElementsByClassName("error")[0].innerHTML =
    "Товар не выбран";
  } else if (count.match(/^\s*$/)) {
    document.getElementsByClassName("error")[0].innerHTML =
    "Количество товара не введено";
  } else if (count.match(/[^0-9]/)) {
    document.getElementsByClassName("error")[0].innerHTML =
    "Количество товара введено некорректно";
  } else {
    document.getElementsByClassName("error")[0].innerHTML = "";
    switch (product) {
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
    total_price = parseInt(count) * price;
    total_message = "Итоговая цена: " + total_price + " $";
    document.getElementsByClassName("final_price")[0].innerHTML = total_message;
  }
}
