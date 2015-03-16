var React = require('react');
var Button = require('react-bootstrap').Button;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var LoginModal = require('./login-modal.jsx');


//This button is used to open a login modal

var LoginButton = React.createClass({
  render: function(){
    
    return (
      <ModalTrigger modal={<LoginModal />}>
        <Button bsStyle='primary'>Sign In!</Button>
      </ModalTrigger>
    );
  }
});

module.exports = LoginButton;