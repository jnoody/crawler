/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');

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
        this.updateDom(this.props.dom);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.dom !== this.props.dom) {
            this.updateDom(nextProps.dom);
        }

        return false;
    },

    updateDom: function (dom) {
        $(this.getDOMNode())
            .contents()
            .find('body')
            .empty()
            .append(dom);
    }
});
