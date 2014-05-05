/** @jsx React.DOM */

var React = require('./react');

module.exports = React.createClass({
    render: function () {
        return (
            <form>
                <legend>Enter the URL you would like to begin crawling</legend>
            </form>
        );
    }
});
