'use strict';

// const Menu = remote.require('menu');
// const MenuItem = remote.require('menu-item');

const remote = require('remote');
const Menu = remote.require('menu');
const menuTemplate = requireLocal('menu-template');

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// Create an ordered list of menu items.
const MENU_REFERENCES = new Map([
  ['backgrounds', []],
  ['background-tracks', []]
]);

// Mantain a list of events for each menu section.
const REGISTERED_EVENTS = new Map([
  ['backgrounds', new Map()],
  ['background-tracks', new Map()]
]);

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
};

/**
 * Render menu helper that renders a specific section.
 * @private
 * @param  {string} section       Menu section (like `backgrounds`).
 * @param  {object} parentElement Dom element.
 */
const renderSection = function(section, parentElement) {
  // Iterate over all the created menu elements in the system.
  for (let elem of settingsSection(section)) {
    // Append the current element to the parent section element.
    parentElement.appendChild(elem);

    // Iterate over all the registered event for this type of node.
    for (let registeredEvents of REGISTERED_EVENTS.get(section)) {
      // Add the current event listener to the just appended node.
      elem.addEventListener(registeredEvents[0], registeredEvents[1], false);
    }
  }
}

/**
 * Render the menu with all the elements.
 */
const renderMenu = function() {
  // Get all the parent elements for each section in the menu.

  let backgroundSettingsElement = document.getElementById('background-settings');
  let trackSettingsElement = document.getElementById('background-track-settings');

  // Render each menu section. It will also add registered events listeners.

  renderSection('backgrounds', backgroundSettingsElement);
  renderSection('background-tracks', trackSettingsElement);
};

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
 * Register an event handler to menu section.
 * @param  {string}   section Menu section (like `backgrounds`).
 * @param  {string}   action  Event to be handled (like `click`).
 * @param  {function} handler Function to be called when event happens.
 */
const eventRegister = function(section, action, handler) {
  let events = REGISTERED_EVENTS.get(section);
  events.set(action, handler);
};

// Export the public API.

module.exports = {
  'render': renderMenu,
  'eventRegister': eventRegister,
  'SettingsMenuItem': SettingsMenuItem
};
