/** @jsx React.DOM */

var React = require('./react');
var $ = require('jquery');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                {
                    this.props.url ?
                    <iframe
                        className="iframe"
                        src="about:blank"
                        ref="iframe"
                    /> :
                    null
                }
            </div>
        );
    },

    componentDidMount: function () {
        $(this.refs.iframe.getDOMNode()).contents().find('body').append('hello iframe');
    }
});

