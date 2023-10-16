var window = window;
var document = document;

window.addEventListener("DOMContentLoaded", function () {
  var radios = document.getElementsByName("choosing-service");
  for (i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", changeForm);
  }
});

var servicesInfo = {
  phoneMaintenance : {
    price : 3200,
    features : {
      installationOfProtectiveGlass : 800,
      replacingTheProcessor : 1700,
      buyingACover : 400,
      cleaningTheSpeakers : 250,
      replacingTheDisplay : 2300
    }
  },
  laptopMaintenance : {
    price : 5800,
    options : {
      thermalPasteUpdate : 1900,
      batteryReplacement : 3500,
      cleaningFromDust : 3000,
      checkingFunctionality : 2700,
      replacingTheProcessor : 4100
    }
  },
  buyGame : {
    price : 4700
  },
  vehicleInspection : {
    price : 67500
  },
  overclockingVideoCard : {
    price : 7900,
    options : {
      minimum : 100,
      medium : 500,
      maximum : 1000
    }
  },
  stoneCare : {
    price : 1234567890,
    features : {
      polishing : 1237890,
      gentleWashing : 4561230,
      creatingAUniqueDrawing : 987321,
      giveToTheMaster : 0
    }
  }
};

// console.log(servicesInfo);
// for (var i in servicesInfo) {

//   console.log(i)
//   console.log(servicesInfo[i]);

// }

function changeForm(event) {
  var optionAndFeatures = document.getElementById("optionAndFeatures");
  
}