/** @jsx React.DOM */

var React = require('./react');
var HelloMessage = require('./HelloMessage.jsx');

React.renderComponent(
    <HelloMessage />,
    document.getElementById('app')
);
