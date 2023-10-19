var window = window;
var document = document;

window.addEventListener("DOMContentLoaded", function () {
  const radios = document.getElementsByName("choosing-service");
  const count = document.getElementById("product_count");
  const form = document.getElementById("main-form");
  var i;
  var service;
  form.onsubmit = function () {
    return false;
  };
  for (i = 0; i < radios.length; i += 1) {
    radios[i].addEventListener("change", function () {
      if (this !== null) {
        changeForm(this);
        service = this;
        const optionAndFeatures = document.getElementById("optionAndFeatures");
        var addPrice = 0;
        var cnt;
        optionAndFeatures.addEventListener("change", function () {
          addPrice = checkAddServices(service.value);
        });
        count.value = "";
        count.addEventListener("input", function () {
          cnt = this.value;
        });
        document.addEventListener("change", function () {
          if ("undefined" !== typeof(cnt)) {
            if (!count.value.match(/[^0-9]/) && !count.value.match(/^\s*$/)) {
              findTotalPrice(service, addPrice, cnt);
            } else {
              clearTotalPrice();
            }
          }
        });
      }
    });
  }
});

const servicesInfo = {
  buyGame: {
    mainPrice: 4700
  },
  laptopMaintenance: {
    mainPrice: 5800,
    options: {
      batteryReplacement: {
        addPrice: 3500,
        title: "Замена батареи"
      },
      checkingFunctionality: {
        addPrice: 2700,
        title: "Проверка функциональности"
      },
      cleaningFromDust: {
        addPrice: 3000,
        title: "Очистка от пыли"
      },
      replacingTheProcessor: {
        addPrice: 4100,
        title: "Замена процессора"
      },
      thermalPasteUpdate: {
        addPrice: 1900,
        title: "Обновление термопасты"
      }
    }
  },
  overclockingVideoCard: {
    mainPrice: 7900,
    options: {
      maximum: {
        addPrice: 1000,
        title: "Максимально"
      },
      medium: {
        addPrice: 500,
        title: "Нормально так"
      },
      minimum: {
        addPrice: 100,
        title: "Минимум"
      }
    }
  },
  phoneMaintenance: {
    features: {
      buyingACover: {
        addPrice: 400,
        title: "Покупка чехла"
      },
      cleaningTheSpeakers: {
        addPrice: 250,
        title: "Очистка динамиков"
      },
      installationOfProtectiveGlass: {
        addPrice: 800,
        title: "Установка защитного стекла"
      },
      replacingTheDisplay: {
        addPrice: 2300,
        title: "Замена дисплея"
      },
      replacingTheProcessor: {
        addPrice: 1700,
        title: "Замена процессора"
      }
    },
    mainPrice: 3200
  },
  stoneCare: {
    features: {
      creatingAUniqueDrawing: {
        addPrice: 987321,
        title: "Создание уникального рисунка"
      },
      gentleWashing: {
        addPrice: 4561230,
        title: "Нежное мытьё"
      },
      giveToTheMaster: {
        addPrice: 0,
        title: "Подарить мастеру"
      },
      polishing: {
        addPrice: 1237890,
        title: "Полировка"
      }
    },
    mainPrice: 1234567890
  },
  vehicleInspection: {
    mainPrice: 67500
  }
};

function changeForm(radio) {
  const optionAndFeatures = document.getElementById("optionAndFeatures");
  optionAndFeatures.innerHTML = "";
  const service = servicesInfo[radio.value];
  if (Object.keys(service).length === 2) {
    if ("options" === Object.keys(service)[1]) {
      const optionsSelect = document.createElement("select");
      optionsSelect.classList.add("text");
      optionsSelect.name = "options";
      optionsSelect.id = "option_select";
      optionsSelect.style.marginLeft = "10px";
      const defaultOption = document.createElement("option");
      defaultOption.value = " ";
      defaultOption.innerHTML = "Список опций";
      optionsSelect.appendChild(defaultOption);
      Object.keys(service.options).forEach(function (key) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = service.options[key].title;
        optionsSelect.appendChild(option);
      });
      const p = document.createElement("p");
      const label = document.createElement("label");
      label.classList.add("text");
      label.htmlFor = "option_select";
      label.innerHTML += "Выберите опцию к услуге";
      p.appendChild(label);
      p.appendChild(optionsSelect);
      optionAndFeatures.appendChild(p);
    } else if ("features" === Object.keys(service)[0]) {
      const fieldset = document.createElement("fieldset");
      const titleLegend = document.createElement("legend");
      titleLegend.classList.add("text");
      titleLegend.innerHTML = "Выберите свойство/свойства услуги";
      fieldset.appendChild(titleLegend);
      optionAndFeatures.appendChild(fieldset);
      Object.keys(service.features).forEach(function (key) {
        const feature = document.createElement("input");
        feature.type = "checkbox";
        feature.value = key;
        feature.name = "features";
        const legend = document.createElement("legend");
        legend.classList.add("text");
        legend.classList.add("features");
        legend.appendChild(feature);
        fieldset.appendChild(legend);
        legend.innerHTML += service.features[key].title;
      });
    }
  }
}

function checkAddServices(serviceValue) {
  var optionalServicesPrice = 0;
  var i;
  const features = document.getElementsByClassName("features");
  const options = document.getElementById("option_select");
  if (features.length !== 0) {
    for (i = 0; i < features.length; i += 1) {
      const featuresList = servicesInfo[serviceValue].features;
      const featureValue = features[i].children[0].value;
      if (features[i].children[0].checked) {
        optionalServicesPrice += featuresList[featureValue].addPrice;
      }
    }
  } else if (options.length !== 0) {
    const optionsList = servicesInfo[serviceValue].options;
    const optionValue = options.value;
    if (optionValue !== " ") {
      optionalServicesPrice += optionsList[optionValue].addPrice;
    }
  }
  return optionalServicesPrice;
}

function findTotalPrice(service, addPrice, count) {
  var totalPrice;
  const serviceInfo = servicesInfo[service.value];
  const servicePrice = serviceInfo.mainPrice + addPrice;
  totalPrice = servicePrice * count;
  totalPrice = String(totalPrice).replace(/(\d)(?=(\d{3})+$)/mg, "$1 ");
  const totalMessage = "С вас " + totalPrice + " $";
  document.getElementsByClassName("final_price")[0].innerHTML = totalMessage;
}

function clearTotalPrice() {
  document.getElementsByClassName("final_price")[0].innerHTML = "";
}
