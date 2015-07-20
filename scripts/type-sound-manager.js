/* globals: MEDIA_FOLDER */

'use strict';

const $ = require('jquery');
const Wad = require('../bower_components/wad/build/wad');

const TypeTrack = new Wad({
  source: 'sine',
  panning: [0, 1, 10],
  panningModel: 'HRTF',
  env: {
    attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
    decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
    sustain : 0.1,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
    hold    : 0.1,  // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
    release : 0.1   // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  }
});

$(document).on('keyup', function() {
  TypeTrack.play();
});
