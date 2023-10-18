var window = window;
var document = document;

window.addEventListener("DOMContentLoaded", function () {
  var radios = document.getElementsByName("choosing-service");
  var count = document.getElementById("product_count");
  var form = document.getElementById("main-form");
  form.onsubmit = function () {
    return false;
  }
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
      if (this !== null) {
        changeForm(this);
        service = this;
        var optionAndFeatures = document.getElementById("optionAndFeatures");
        var addPrice = 0;
        optionAndFeatures.addEventListener("change", function () {
          addPrice = checkAddServices(service.value);
        })
        count.value = "";
        var cnt;
        count.addEventListener("input", function () {
          cnt = this.value;
        })
        document.addEventListener("change", function () {
          if (typeof(cnt) !== "undefined") {
            if (!count.value.match(/[^0-9]/) && !count.value.match(/^\s*$/)) {
              findTotalPrice(service, addPrice, cnt);
            } else {
              clearTotalPrice();
            }
          }
        })
      }
    });
  }
});

var servicesInfo = {
  phoneMaintenance : {
    mainPrice : 3200,
    features : {
      installationOfProtectiveGlass : {
        addPrice : 800,
        title : "Установка защитного стекла"
      },
      replacingTheProcessor : {
        addPrice : 1700,
        title : "Замена процессора"
      },
      buyingACover : {
        addPrice : 400,
        title : "Покупка чехла"
      },
      cleaningTheSpeakers : {
        addPrice : 250,
        title : "Очистка динамиков"
      },
      replacingTheDisplay : {
        addPrice : 2300,
        title : "Замена дисплея"
      }
    }
  },
  laptopMaintenance : {
    mainPrice : 5800,
    options : {
      thermalPasteUpdate : {
        addPrice : 1900,
        title : "Обновление термопасты"
      },
      batteryReplacement : {
        addPrice : 3500,
        title : "Замена батареи"
      },
      cleaningFromDust : {
        addPrice : 3000,
        title : "Очистка от пыли"
      },
      checkingFunctionality : {
        addPrice : 2700,
        title : "Проверка функциональности"
      },
      replacingTheProcessor : {
        addPrice : 4100,
        title : "Замена процессора"
      }
    }
  },
  buyGame : {
    mainPrice : 4700
  },
  vehicleInspection : {
    mainPrice : 67500
  },
  overclockingVideoCard : {
    mainPrice : 7900,
    options : {
      minimum : {
        addPrice : 100,
        title : "Минимум (чтобы Cyberpank2077 на средних запустился)"
      },
      medium : {
        addPrice : 500,
        title : "Нормально (чтобы Cyberpank2077 на максималках запустился)"
      },
      maximum : {
        addPrice : 1000,
        title : "Максимально (даже если через день сгорит)"
      }
    }
  },
  stoneCare : {
    mainPrice : 1234567890,
    features : {
      polishing : {
        addPrice : 1237890,
        title : "Полировка"
      },
      gentleWashing : {
        addPrice : 4561230,
        title : "Нежное мытьё"
      },
      creatingAUniqueDrawing : {
        addPrice : 987321,
        title : "Создание уникального рисунка"
      },
      giveToTheMaster : {
        addPrice : 0,
        title : "Подарить мастеру"
      }
    }
  }
};

function changeForm(radio) {
  var optionAndFeatures = document.getElementById("optionAndFeatures");
  optionAndFeatures.innerHTML = "";
  var service = servicesInfo[radio.value];
  if (Object.keys(service).length === 2) {
    if ("options" === Object.keys(service)[1]) {
      var optionsSelect = document.createElement("select");
      optionsSelect.classList.add("text");
      optionsSelect.name = "options";
      optionsSelect.id = "option_select";
      optionsSelect.style.marginLeft = "10px";
      var option = document.createElement("option");
      option.value = " ";
      option.innerHTML = "Список опций";
      optionsSelect.appendChild(option);
      for (var key in service.options) {
        var option = document.createElement("option");
        option.value = key;
        option.innerHTML = service.options[key].title;
        optionsSelect.appendChild(option);
      }
      var p = document.createElement("p");
      var label = document.createElement("label");
      label.classList.add("text");
      label.htmlFor = "option_select";
      label.innerHTML += "Выберите опцию к услуге";
      p.appendChild(label);
      p.appendChild(optionsSelect);
      optionAndFeatures.appendChild(p);
    } else if ("features" === Object.keys(service)[1]) {
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.classList.add("text");
      legend.innerHTML = "Выберите свойство/свойства услуги";
      fieldset.appendChild(legend);
      optionAndFeatures.appendChild(fieldset);
      for (var key in service.features) {
        var feature = document.createElement("input");
        feature.type = "checkbox";
        feature.value = key;
        feature.name = "features";
        feature.checked;
        var legend = document.createElement("legend");
        legend.classList.add("text");
        legend.classList.add("features");
        legend.appendChild(feature);
        fieldset.appendChild(legend);
        legend.innerHTML += service.features[key].title;
      }
    }
  }
}

function checkAddServices(serviceValue) {
  var optionalServicesPrice = 0;
  var features = document.getElementsByClassName("features");
  var options = document.getElementById("option_select");
  if (features.length !== 0) {
    for (var feature of features) {
      var featuresList = servicesInfo[serviceValue].features;
      var featureValue = feature.children[0].value;
      if (feature.children[0].checked) {
        optionalServicesPrice += featuresList[featureValue].addPrice;
      }
    }
  } else if (options.length !== 0) {
    var optionsList = servicesInfo[serviceValue].options;
    var optionValue = options.value;
    if (optionValue != " ") {
      optionalServicesPrice += optionsList[optionValue].addPrice;
    }
  }
  return optionalServicesPrice;
}

function findTotalPrice(service, addPrice, count) {
  var serviceInfo = servicesInfo[service.value];
  var servicePrice = serviceInfo.mainPrice + addPrice;
  var totalPrice = servicePrice*count;
  totalPrice = String(totalPrice).replace(/(\d)(?=(\d{3})+$)/mg, '$1 ');
  var totalMessage = "С вас " + totalPrice + " $";
  document.getElementsByClassName("final_price")[0].innerHTML = totalMessage;
}

function clearTotalPrice() {
  document.getElementsByClassName("final_price")[0].innerHTML = "";
}