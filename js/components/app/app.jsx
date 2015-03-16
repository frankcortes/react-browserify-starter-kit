var React = require('react');
var LoginButton = require('../login/login-button.jsx');


var App =  React.createClass({
    render: function() {
        return (
            <div>
                <h1>This is My React App!</h1>
                <LoginButton />
            </div>
        );
    }
});

module.exports = App;