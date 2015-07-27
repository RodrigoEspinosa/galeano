'use strict';

// Private settings store.
const SETTINGS = new Map();

// List of values to be given as default.

SETTINGS.set('DEFAULT_BACKGROUND', 'simple');
SETTINGS.set('DEFAULT_BACKGROUND_TRACK', 'blackStars');

// Export the public API.

module.exports = class Settings {

  /**
   * Get an attributes value.
   * @param  {string} attr Setting attribute (like `background`).
   * @return {string}      Return the value associated to this attribute.
   */
  static get(attr) {
    return SETTINGS.get(attr) || SETTINGS.get('DEFAULT_' + attr);
  }

  /**
   * Set an attribute.
   * @param {string} attr Setting attribute (like `background`).
   * @param {string} val  Value to associated to this attribute.
   */
  static set(attr, val) {
    return SETTINGS.set(attr, val);
  }
}
