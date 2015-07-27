'use strict';

const Editor = requireLocal('editor');
const Menu = requireLocal('menu');

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

  // Set the editor schema for the selected background.

  let editorSchema = this.getAttribute('data-set-editor-schema');

  if (editorSchema === 'galeano-dark') {
    Editor.setOption('theme', 'galeano-dark');
  } else {
    Editor.setOption('theme', 'galeano');
  }
};

// Set the background options.

new Menu.SettingsMenuItem('backgrounds', {
  'background': 'simple',
  'editor-schema': 'galeano'
});
new Menu.SettingsMenuItem('backgrounds', {
  'background': 'mountains-light',
  'editor-schema': 'galeano'
});
new Menu.SettingsMenuItem('backgrounds', {
  'background': 'sand',
  'editor-schema': 'galeano-dark'
});
new Menu.SettingsMenuItem('backgrounds', {
  'background': 'color-therapy',
  'editor-schema': 'galeano-dark'
});

Menu.eventRegister('backgrounds', 'click', backgroundSettingOnClick);
