/** @jsx React.DOM */

var React = require('./react');

module.exports = React.createClass({
    render: function () {
        return (
            <form onSubmit={ this.handleSubmit }>
                <legend>Enter the URL you would like to begin crawling</legend>
                <input
                    className="url"
                    type="url"
                    placeholder="Enter URL to crawl..."
                    ref="url"
                    defaultValue={ this.props.url }
                />
                <input
                    className="submit"
                    type="submit"
                    value="go"
                />
            </form>
        );
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var url = this.refs.url.getDOMNode().value;
        this.props.onUrlSubmit(url);
    }
});
