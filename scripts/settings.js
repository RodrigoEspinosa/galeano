'use strict';

const SETTINGS = new Map();

SETTINGS.set('DEFAULT_BACKGROUND_TRACK', 'blackStars');

module.exports = class Settings {

  static get(attr) {
    return SETTINGS.get(attr) || SETTINGS.get('DEFAULT_' + attr);
  }

  static set(attr, val) {
    return SETTINGS.set(attr, val);
  }
}
