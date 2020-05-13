// ============== Яндекс.Карта ==================
ymaps.ready(init);
var myMap,
  myPlacemar

function init() {
  myMap = new ymaps.Map("yandex-map", {
    center: [59.939107, 30.321463],
    zoom: 15,
    controls: []

  });
  myMap.behaviors.disable('scrollZoom');

  myMap.controls.add('zoomControl', {
    float: 'none',
    position: {
      top: '100px',
      right: '30px'
    }
  });

  myMap.controls.add('geolocationControl');
  myMap.controls.add('fullscreenControl');
  myMap.controls.add('routeButtonControl', {
    float: 'right'
  });

  myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
    hintContent: 'Nёrds',
    balloonContent: '191186, Санкт-Петербург, ул. Б. Конюшенная, д. 19/8'
  }, {
    iconLayout: 'default#image',
    iconImageHref: '/img/png/pin.png',
    iconImageSize: [231, 190],
    iconImageOffset: [-48, -190]
  });

  myMap.geoObjects.add(myPlacemark);
}

// ============== Модальное окно ==================

var modal_win = document.getElementById('modal');
var modal_btn = document.getElementById('modal_close');
var btn_write_us = document.getElementById('btn_write_us');
var form = modal_win.getElementsByClassName("feedback-form")[0];
var login = document.getElementById('feedback-form-fullname');
var email = document.getElementById("feedback-form-email");
var mess = document.getElementById("feedback-form-message");
var storage_mess = localStorage.getItem("mess");

function show_modal(event) {
  modal_win.classList.add('open');
  event.preventDefault();
  if (storage_mess) {
    mess.value = storage_mess;
    email.focus();
  } 

  document.onkeydown = function (event) {
    if (event.keyCode === 27) { 
      close_modal(modal_win);
    }
  };
}

function close_modal(modal_win) {
  modal_win.classList.remove('open');
  modal_win.classList.remove("modal-error");
}

modal_btn.addEventListener('click', function () {
  close_modal(modal_win);
});

btn_write_us.addEventListener('click', show_modal);

form.addEventListener("submit", function (event) {
  modal_win.classList.remove("modal-error");
  if (email.value == '' || mess.value == '') {
    
    setTimeout(function () {
      modal_win.classList.add("modal-error");
    }, 0);
    
    event.preventDefault();
  } else {
    localStorage.setItem("mess", mess.value);
  }
});
