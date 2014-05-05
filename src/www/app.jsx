/** @jsx React.DOM */

var React = require('./react');
//var Crawler = require('./Crawler.jsx');
var Navigator = require('./Navigator.jsx');
var Viewer = require('./Viewer.jsx');

var CrawlerApp = React.createClass({
    getInitialState: function () {
        return {
            url: ''
        };
    },

    render: function () {
        return (
            <div>
                <h1>Crawler</h1>
                <Navigator
                    url={ this.state.url }
                    onUrlSubmit={ this.handleUrlSubmit }
                />
                <Viewer url={ this.state.url } />
            </div>
        );
    },

    handleUrlSubmit: function (url) {
        console.log(url);
        this.setState({ url: url });
    }
});

React.renderComponent(
    <CrawlerApp />,
    document.getElementById('app')
);
