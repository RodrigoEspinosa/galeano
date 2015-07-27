'use strict';

let currentTypeTrack = 'Saw';

const Path = require('path');
const Wad = require('../bower_components/wad/build/wad');

const SOUNDS_DIR = Path.join(MEDIA_DIR, 'type-sounds');

const RoboTypeTrack = new Wad({
  source: 'sine',
  panning: [0, 1, 10],
  panningModel: 'HRTF',

  // reverb  : {
  //     wet     : 1,                                            // Volume of the reverberations.
  //     impulse : 'http://www.myServer.com/path/to/impulse.wav' // A URL for an impulse response file, if you do not want to use the default impulse response.
  // },
  env: {
    attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
    decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
    sustain : 0.1,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
    hold    : 0.1,  // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
    release : 0.1   // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  }
});

const Typewriter = new Wad({
  source: Path.join(SOUNDS_DIR, '9744__horn__typewriter.wav')
});

const SawTypeTrack = new Wad.Poly();

SawTypeTrack.add(new Wad({
  source: 'sine',

  pitch: 'G#2',

  env: {
    attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
    decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
    sustain : 0.1,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
    hold    : 0.1,  // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
    release : 0.1   // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  }
})).add(new Wad({
  source: 'sine',

  pitch: 'C4',

  env: {
    attack  : 0.1,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
    decay   : 0.1,  // Time in seconds from peak volume to sustain volume.
    sustain : 0.1,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
    hold    : 0.1,  // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
    release : 0.1   // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
  }
}));

const frequencies = [436, 438, 440, 442, 444, 448, 450];

// Add the event listener for playing the sound on evey keyup.

document.addEventListener('keypress', function() {
  // if (currentTypeTrack === 'Robo') {
  //   let i = (Math.random() * frequencies.length);
  //   RoboTypeTrack.play({pitch: frequencies[i]});
  // } else {
  //   SawTypeTrack.play();
  // }

  Typewriter.play();
});


// TODO Export an event.

module.exports = null;
