'use strict';

const fs = require('fs');
const remote = require('remote');
const dialog = remote.require('dialog');
const marked = require('marked');

/**
 * Action event that exports the content of
 * the editor and saves it as a markdown file.
 */
const exportMarkdown = function() {
  let Editor = requireLocal('editor');
  let markdownCode = Editor.getValue();

  dialog.showSaveDialog(remote.getCurrentWindow(), {
    title: 'Export as Markdown',
    filters: [{name: 'Markdown', extensions: ['md', 'markdown']}]
  }, function(filePath) {
    return fs.writeFileSync(filePath, markdownCode);
  });
};

/**
 * Action event that exports and rendered HTML
 * based on the content of the editor and saves
 * it as a HTML file.
 */
const exportHTML = function() {
  let Editor = requireLocal('editor');
  let htmlRender = marked(Editor.getValue());

  dialog.showSaveDialog(remote.getCurrentWindow(), {
    title: 'Export as HTML',
    filters: [{name: 'HTML', extensions: ['html']}]
  }, function(filePath) {
    return fs.writeFileSync(filePath, htmlRender);
  });
};


// Expose the public API.

module.exports = {
  'exportMarkdown': exportMarkdown,
  'exportHTML': exportHTML
};
