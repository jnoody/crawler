/** @jsx React.DOM */

var React = require('./react');
//var Crawler = require('./Crawler.jsx');
var Navigator = require('./Navigator.jsx');
//var Viewer = require('./Viewer.jsx');

React.renderComponent(
    //<Crawler />,
    <div>
        <h1>Crawler</h1>
        <Navigator />
    </div>,
    document.getElementById('app')
);
