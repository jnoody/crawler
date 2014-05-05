/** @jsx React.DOM */

var React = require('./react');
//var Crawler = require('./Crawler.jsx');
var Navigator = require('./Navigator.jsx');
var Viewer = require('./Viewer.jsx');

var CrawlerApp = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Crawler</h1>
                <Navigator />
                <Viewer />
            </div>
        );
    }
});

React.renderComponent(
    <CrawlerApp />,
    document.getElementById('app')
);
