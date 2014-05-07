/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');
var Navigator = require('./Navigator.jsx');
var Viewer = require('./Viewer.jsx');

var CrawlerApp = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://localhost'
        };
    },

    getDefaultProps: function () {
        return {
            html: '<!doctype html><html><body><div>loading page...</div></body></html>'
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
                <Viewer html={ this.props.html } />
            </div>
        );
    },

    componentDidMount: function () {
        this.updateHtml(this.state.url);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.html !== this.props.html) {
            return true;
        }

        if (nextState.url !== this.state.url) {
            this.updateHtml(nextState.url);
        }

        return false;
    },

    handleUrlSubmit: function (url) {
        this.setState({
            url: url
        });
    },

    htmlDidUpdate: function (res) {
        this.setProps({
            html: res
        });
    },

    htmlDidFail: function () {
    },

    updateHtml: function (url) {
        $.ajax({
            url: url,
            success: this.htmlDidUpdate,
            error: this.htmlDidFail
        });
    }
});

React.renderComponent(
    <CrawlerApp />,
    document.getElementById('app')
);
