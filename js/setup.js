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

var randomItem = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var createArrWizards = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({
      name: WIZARD_NAMES[randomItem(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[randomItem(WIZARD_SURNAMES)],
      coatColor: COAT_COLORS[randomItem(COAT_COLORS)],
      eyesColor: EYES_COLORS[randomItem(EYES_COLORS)]
    });
  }
  return wizards;
};


var createWizardNode = function (wizard) {
  var wizardNode = similarWizardTemplate.cloneNode(true);
  wizardNode.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardNode.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardNode.querySelector('.setup-similar-label').textContent = wizard.name;
  return wizardNode;
};

var fragment = document.createDocumentFragment();
var wizards = createArrWizards();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(createWizardNode(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
