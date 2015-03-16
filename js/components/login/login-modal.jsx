var React = require('react');
var MainActions = require('../../actions/main-actions');

var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;

var LoginModal = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            password: ''
        };
    },
    handleUsername: function() {
        this.setState({
          username: this.refs.username.getValue()
        });
    },
    handlePassword: function() {
        this.setState({
          password: this.refs.password.getValue()
        });
    },
    submit: function() {
        //We need a way to save this info
        /*
        LoginModel.save({
            username: username,
            password: password
        });
        */
    },
    render: function() {
        return (
            <Modal {...this.props} title='Login for app' animation={true}>
                <div className='modal-body'>
                    <Input
                        type='text'
                        value={this.state.username}
                        ref='username'
                        placeholder='Type Username'
                        onChange={this.handleUsername}
                    />
                    <Input
                        type='password'
                        value={this.state.password}
                        ref='password'
                        placeholder='Type Password'
                        onChange={this.handlePassword}
                    />
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.submit}>Submit</Button>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </div>                
            </Modal>
        );
    }

});


module.exports = LoginModal;