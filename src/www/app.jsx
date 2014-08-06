/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');
var Navigator = require('./Navigator.jsx');
var Viewer = require('./Viewer.jsx');
var stringUtil = require('./stringUtil');

var urlPartsRegex = /(http[s]?:\/\/)([^:\/?#]*)([^\/?#]*)([^?#]*)([^#]*)/g;

function escapeFragment(url) {
    /*
     * convert any hash params to escaped fragments as google would do
     *
     * RexEx positions:
     * 0: empty
     * 1: protocol including ://
     * 2: host
     * 3: port including :
     * 4: path
     * 5: query
     * 6: hash
     */
    var urlParts = url.split(urlPartsRegex);

    var hash = urlParts[6];

    if (hash.indexOf('#!') === 0) {
        hash = hash.substring(2);

        var hasQuery = urlParts[5].length;

        if (hasQuery) {
            urlParts[5] += '&';
        } else {
            urlParts[5] = '?';
        }

        urlParts[5] += '_escaped_fragment_=' + stringUtil.encodeUriComponent(hash);

        url =
            urlParts[0] +
            urlParts[1] +
            urlParts[2] +
            urlParts[3] +
            urlParts[4] +
            urlParts[5];
    }

    return url;
}

var CrawlerApp = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://localhost:8000?foo=bar#!foo=baz'
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
            url: escapeFragment(url),
            success: this.htmlDidUpdate,
            error: this.htmlDidFail
        });
    }
});

React.renderComponent(
    <CrawlerApp />,
    document.getElementById('app')
);
