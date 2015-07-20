'use strict';

const CodeMirror = require('codemirror');
require('codemirror/mode/gfm/gfm');

// const previewElement = document.getElementById('preview');

// Get the editor element.
const editorElement = document.getElementById('editor');

/**
 * Initialize the editor
 * @return {object} Editor element.
 */
const initEditor = function() {
  let editor = CodeMirror.fromTextArea(editorElement, {
    mode: 'gfm',
    lineNumbers: false,
    matchBrackets: true,
    lineWrapping: true,
    theme: 'galeano',
    extraKeys: {
      'Enter': 'newlineAndIndentContinueMarkdownList'
    }
  });

  return editor;
};

/**
 * Render the text into the preview element.
 * @param  {string} text Text to be rendered in the preview element.
 * @return {void}
 */
const renderText = function(text) {
  previewElement.innerHTML = new Marked(text);
};


module.exports = initEditor();
