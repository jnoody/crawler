/** @jsx React.DOM */

var React = require('./react');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                { this.props.url ? <iframe src={ this.props.url } /> : null }
            </div>
        );
    }
});

