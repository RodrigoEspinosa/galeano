'use strict';

const $ = require('jQuery');
const _ = require('lodash');
const Path = require('path');
const Wad = require('../bower_components/wad/build/wad');

const Menu = requireLocal('menu');
const Settings = requireLocal('settings');
const TRACKS_DIR = Path.join(MEDIA_DIR, 'background-tracks');

// Create the event emmiter for the manager.
const backgroundTrackEvents = new (require('events')).EventEmitter();

// Keep track of the current track if there is one.
let currentTrack = null;

/**
 * Class for creating background tracks.
 */
class BackgroundTrack {

  /**
   * Background track constructor.
   * @constructor
   * @param  {string} trackSource Source of the track to be instanced.
   * @param  {object} playAttrs   Optional. Attributes for the play method.
   */
  constructor(trackSource, playAttrs) {
    // Set the play method default settings.
    this.DEFAULT_PLAY_ATTRS = {
      volume: 0.8,
      wait: 0,
      loop: true,
      env: {
        // Fade-in duration in seconds.
        attack: 3.0,
        // Track duration in seconds.
        hold : 9001
      }
    };

    this.source = trackSource;
    this.playAttrs = playAttrs || {};

    this.wad = new Wad({source: this.source});
  }

  play() {
    this.wad.play(_.merge(this.DEFAULT_PLAY_ATTRS, this.playAttrs));
  }

  stop() {
    this.wad.stop();
  }
}

// Create the list of background tracks mapping with new background tracks instances.

const backgroundTracksList = new Map();

const blackStars = new BackgroundTrack(Path.join(TRACKS_DIR, 'mr_yo_so-black_stars.mp3'));
backgroundTracksList.set('blackStars', blackStars);

new Menu.SettingsMenuItem('background-tracks', {'background-track': null});
new Menu.SettingsMenuItem('background-tracks', {'background-track': 'sand'});

/**
 * Listen to the `on change background track` event.
 * Check if there is a track with the specified label on the settings,
 * if there is not then stop anything been played.
 */
backgroundTrackEvents.on('change', function() {

  // Get the specified (current) track name based on the user settings.
  let currentBackgroundTrackName = Settings.get('BACKGROUND_TRACK');


  // Stop the current track if there is any.

  if (currentTrack) {
    currentTrack.stop();
  }

  // Play the current track if this is on the list.

  if (backgroundTracksList.has(currentBackgroundTrackName)) {
    // Get the current track based on the name.
    let currentBackgroundTrack = backgroundTracksList.get(currentBackgroundTrackName);
    // Play the current track.
    currentBackgroundTrack.play();
    // Keep track of the current track.
    currentTrack = currentBackgroundTrack;
  }

});

// Export the event emitter instance for the background track manager.
module.exports = backgroundTrackEvents;
