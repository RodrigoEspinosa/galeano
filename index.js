var Path = require('path');
var _ = require('lodash');

var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function () {
  var Screen = require('screen');

  var screenSize = Screen.getPrimaryDisplay().workAreaSize;
  var browserSize = {
    width: screenSize.width - 400,
    height: screenSize.height - 200
  };

  var win = new BrowserWindow(_.merge(browserSize, {
    'frame': true,
    'resizible': true
  }));

  win.on('closed', function () {
    win = null;
  });

  win.loadUrl('file://' + Path.join(__dirname, 'templates', 'index.html'));
  win.show();
});
