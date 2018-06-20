'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var chooseRandArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createArrWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({
      name: chooseRandArrItem(WIZARD_NAMES) + ' ' + chooseRandArrItem(WIZARD_SURNAMES),
      coatColor: chooseRandArrItem(COAT_COLORS),
      eyesColor: chooseRandArrItem(EYES_COLORS)
    });
  }
  return wizards;
};


var createWizardNode = function (wizardData) {
  var wizardNode = similarWizardTemplate.cloneNode(true);
  wizardNode.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardNode.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;
  wizardNode.querySelector('.setup-similar-label').textContent = wizardData.name;
  return wizardNode;
};

var fragment = document.createDocumentFragment();
var wizards = createArrWizards();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(createWizardNode(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');


var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = document.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var inputEyesColor = setup.querySelector('input[name=eyes-color]');
var inputFireballColor = setup.querySelector('input[name=fireball-color]');
var inputCoatColor = setup.querySelector('input[name=coat-color]');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var wizardCoat = setup.querySelector('.wizard-coat');

var chooseNextItem = function (arr, inputType) {
  var indexColor = arr.indexOf(inputType.value) + 1;
  var nextItem = arr[indexColor % arr.length];
  return nextItem;
};

var changeColor = function (element, attribute, colorsArr, input) {
  element.addEventListener('click', function () {
    var nextColor = chooseNextItem(colorsArr, input);
    element.style[attribute] = nextColor;
    input.value = nextColor;
  });
};

changeColor(wizardEyes, 'fill', EYES_COLORS, inputEyesColor);
changeColor(wizardCoat, 'fill', COAT_COLORS, inputCoatColor);
changeColor(fireballWrap, 'background', FIREBALL_COLORS, inputFireballColor);
