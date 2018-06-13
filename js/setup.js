'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var chooseArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createArrWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({
      name: chooseArrItem(WIZARD_NAMES) + ' ' + chooseArrItem(WIZARD_SURNAMES),
      coatColor: chooseArrItem(COAT_COLORS),
      eyesColor: chooseArrItem(EYES_COLORS)
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
