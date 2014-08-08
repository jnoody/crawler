/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');
var _ = require('./lodash');
var stringUtil = require('./stringUtil');

var escapedFragmentKey = '_escaped_fragment_';

module.exports = React.createClass({
    render: function () {
        return (
            <iframe
                className="iframe"
                src="about:blank"
            />
        );
    },

    componentDidMount: function () {
        this.updateHtml(this.props.html);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.html !== this.props.html) {
            this.updateHtml(nextProps.html);
        }

        return false;
    },

    updateHtml: function (html) {
        var $container = this.getContainer(html);

        // do we have a meta fragment
        var hasMetaFragment = $container.find('meta[name="fragment"][content="!"]').length;

        // are we already browsing to an escaped fragment
        var urlParts = stringUtil.splitUrl(this.props.url);
        var queryMap = stringUtil.toQueryMap(urlParts[5]);
        var hasEscapedFragment = _.findWhere(queryMap, { key: escapedFragmentKey });

        if (hasMetaFragment && !hasEscapedFragment) {
            
        } else {
            $(this.getDOMNode()).contents().find('body')
                .empty()
                .append($container.html());
        }
    },

    getContainer: function (html) {
        var $container = $('<div></div>');

        $container
            .append(html);

        this.blockJavaScript($container);
        this.toEscapedFragment($container);;

        return $container;
    },

    toEscapedFragment: function ($container) {
        $container
            .find('a[href*=\\#\\!]')
            .each(function (i, a) {
                var $a = $(a)
                $a.attr('href', $a.attr('href').replace('#!', escapedFragmentKey))
            });
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
    }
});

