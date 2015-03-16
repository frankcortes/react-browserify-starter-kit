//Main file to execute browserify

var React = require('react');

var App = require('./js/components/app/app.jsx');

React.render(
  <App />,
  document.getElementById('app')
);