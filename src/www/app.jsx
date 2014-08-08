/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');
var _ = require('./lodash');
var Navigator = require('./Navigator.jsx');
var Viewer = require('./Viewer.jsx');
var stringUtil = require('./stringUtil');

var escapedFragmentKey = '_escaped_fragment_';

var CrawlerApp = React.createClass({
    getInitialState: function () {
        return {
            url: 'http://localhost:8000?foo=bar#!baz=qux',
            dom: $('<div>loading...</div>')
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
                <Viewer
                    dom={ this.state.dom }
                />
            </div>
        );
    },

    componentDidMount: function () {
        this.updateHtml(this.state.url);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextState.dom !== this.state.dom) {
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
        var dom = this.getDom(res);

        if (!this.isUrlUpdating(dom)) {
            this.setState({
                dom: dom
            });
        }
    },

    htmlDidFail: function () {
        this.setState({
            dom: $('<div>Request for ' + this.state.url + ' failed.</div>')
        });
    },

    updateHtml: function (url) {
        $.ajax({
            url: stringUtil.escapeFragment(url),
            success: this.htmlDidUpdate,
            error: this.htmlDidFail
        });
    },

    isUrlUpdating: function (dom) {
        // do we have a meta fragment
        var hasMetaFragment = dom.find('meta[name="fragment"][content="!"]').length;

        // are we already browsing to an escaped fragment
        var urlParts = stringUtil.splitUrl(this.state.url);
        var queryMap = stringUtil.toQueryMap(urlParts[5]);
        var hasEscapedFragment = _.findWhere(queryMap, { key: escapedFragmentKey });

        if (hasMetaFragment && !hasEscapedFragment) {
            queryMap.push({
                key: '_escaped_fragment_',
                value: urlParts[6]
            });
            var newQuery =
                _.map(queryMap, function (pair) {
                    return pair.key + '=' + pair.value;
                })
                .join('&');

            var escapedFragmentUrl =
                urlParts[0] +
                urlParts[1] +
                urlParts[2] +
                urlParts[3] +
                urlParts[4] +
                '?' + newQuery;

            this.setState({ url: escapedFragmentUrl });

            return true;
        } else {
            return false;
        }
    },

    getDom: function (html) {
        var $container = $('<div></div>');

        $container
            .append(html);

        this.blockJavaScript($container);
        this.toEscapedFragment($container);;

        return $container;
    },

    blockJavaScript: function ($container) {
        $container
            .find('script')
            .remove();

        $container.find('*[onclick]').removeAttr('onclick');
        $container.find('*[dblclick]').removeAttr('dblclick');
        $container.find('*[onmousedown]').removeAttr('onmousedown');
        $container.find('*[onmousemove]').removeAttr('onmousemove');
        $container.find('*[onmouseover]').removeAttr('onmouseover');
        $container.find('*[onmouseout]').removeAttr('onmouseout');
        $container.find('*[onmouseup]').removeAttr('onmouseup');
        $container.find('*[onkeypress]').removeAttr('onkeypress');
        $container.find('*[onkeydown]').removeAttr('onkeydown');
        $container.find('*[onkeyup]').removeAttr('onkeyup');
        $container.find('*[onabort]').removeAttr('onabort');
        $container.find('*[onerror]').removeAttr('onerror');
        $container.find('*[onload]').removeAttr('onload');
        $container.find('*[onresize]').removeAttr('onresize');
        $container.find('*[onscroll]').removeAttr('onscroll');
        $container.find('*[onunload]').removeAttr('onunload');
        $container.find('*[onblur]').removeAttr('onblur');
        $container.find('*[onchange]').removeAttr('onchange');
        $container.find('*[onfocus]').removeAttr('onfocus');
        $container.find('*[onreset]').removeAttr('onreset');
        $container.find('*[onselect]').removeAttr('onselect');
        $container.find('*[onsubmit]').removeAttr('onsubmit');
    },

    toEscapedFragment: function ($container) {
        $container
            .find('a[href*=\\#\\!]')
            .each(function (i, a) {
                var $a = $(a)
                $a.attr('href', $a.attr('href').replace('#!', escapedFragmentKey))
            });
    }
});

React.renderComponent(
    <CrawlerApp />,
    document.getElementById('app')
);
