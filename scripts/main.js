(function() {
  'use strict';

  const Path = require('path');
  const remote = require('remote');

  // Set the globals variables. Set the directories.
  global.ROOT_DIR = Path.join(__dirname, '..');
  global.MEDIA_DIR = Path.join(ROOT_DIR, 'media');
  global.SCRIPTS_DIR = Path.join(ROOT_DIR, 'scripts');
  global.requireLocal = require(Path.join(SCRIPTS_DIR, 'utils')).requireLocal;

  const Settings = requireLocal('settings');
  const Menu = requireLocal('menu');

  // Initialize the editor.
  const Editor = requireLocal('editor');

  // Initialize the manager for the key-pressing sounds.
  const typeSound = requireLocal('type-sound-manager');

  requireLocal('backgrounds');

  // Initialize the manager for background tracks.
  const backgroundTrack = requireLocal('background-track-manager');

  document.addEventListener('DOMContentLoaded', function() {
    // Trigger the `change background track` event for initialize.
    backgroundTrack.emit('change');

    // Focus on the editor.
    Editor.focus();

    // Render the side menu.
    Menu.render();
  });

}());
