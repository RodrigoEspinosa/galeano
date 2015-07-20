'use strict';

// const Menu = remote.require('menu');
// const MenuItem = remote.require('menu-item');

// Create an ordered list of menu items.
const MENU_REFERENCES = new Map([
  ['backgrounds', []],
  ['background-tracks', []]
]);

const Editor = requireLocal('editor');

class SettingsMenuItem {

  /**
   * SettingsMenuItem constructor.
   * @param  {string} section name of the section.
   * @param  {object} attrs   attributes to be setted when setting is activated.
   */
  constructor(section, attrs) {
    this.attrs = attrs;

    // Add this setting to his section set.
    MENU_REFERENCES.get(section).push(this);
  }

  /**
   * Return the DOM element for the item in the list.
   * @return {object} `LI` document object element.
   */
  toHTML() {
    // Create the element.
    let liElement = document.createElement('li');
    // Append the class common `settings-setter` class name to the element.
    liElement.classList.add('settings-setter');

    // Append every specified attribute.

    for (let attr in this.attrs) {
      liElement.setAttribute('data-set-' + attr, this.attrs[attr]);
    }

    // Return the new generated element.
    return liElement;
  }
}

/**
 * Get all the HTML elements for a specific section.
 * @private
 * @param  {string} section Section name.
 * @return {array}          Array with the elements.
 */
const settingsSection = function(section) {
  return MENU_REFERENCES.get(section).map(function(elem) {
    return elem.toHTML();
  });
}

/**
 * Handle the on click on `background change button` event.
 * @private
 */
const backgroundSettingOnClick = function() {
  // Get the background.
  let backgrounds = document.getElementsByClassName('background');

  // Get the wanted background class name.
  let selectedBackgroundClassName = 'background-' + this.getAttribute('data-set-background');

  // Iterate over all the backgrounds.
  for (let i = 0; i < backgrounds.length; i++) {
    // Get the current background been iterated.
    let background = backgrounds[i];
    // Check if the current background is the wanted one.
    let isWantedBackground = background.classList.contains(selectedBackgroundClassName);
    // Remove the 'active' class if the background is not wanted and add it if it is.
    background.classList.toggle('active', isWantedBackground);
  }

  let editorSchema = this.getAttribute('data-set-editor-schema');

  if (editorSchema === 'galeano-dark') {
    Editor.setOption('theme', 'galeano-dark');
  } else {
    Editor.setOption('theme', 'galeano');
  }
};

/**
 * Render the menu with all the elements.
 */
const renderMenu = function() {
  let backgroundSettingsElement = document.getElementById('background-settings');
  let trackSettingsElement = document.getElementById('background-track-settings');

  for (let elem of settingsSection('backgrounds')) {
    backgroundSettingsElement.appendChild(elem);
    elem.addEventListener('click', backgroundSettingOnClick, false);
  }

  for (let elem of settingsSection('background-tracks')) {
    trackSettingsElement.appendChild(elem);
  }
};

// Exports.

module.exports.render = renderMenu;
module.exports.SettingsMenuItem = SettingsMenuItem;
