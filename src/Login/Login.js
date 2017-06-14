import React, { Component } from 'react';
import { loginWithFb, logoutWithFb, login, resetPassword } from '../data/api/auth'
import { LoginInput ,LoginWrapper, LoginButtonsDiv, LoginButton,LoginButtonInv, LoginWelcomeMessage, LoginForm } from './styles'

function Message(msg) {
    return {
        loginResult: msg
    }
}
class Login extends Component {

    state = { loginResult: '' }
    submitHandler = (e) => {
        e.preventDefault()
        login(this.email.value, this.pass.value)
            .catch((error) => { this.setState(Message(error.message)) })

    }

    resetPassword = () => {
        resetPassword(this.email.value)
            .then(() => this.setState(Message('Reset password email sent!')))
            .catch((error) => this.setState(Message('Email address not found.')))
    }
    loginWithFb() {
        let user = loginWithFb();
        console.log(user)
    }
    logOut() {
        logoutWithFb();
    }
    responseFacebook(response) {
        console.log(response);
    }
    render() {

        return (
            <LoginWrapper>
                <LoginWelcomeMessage>Welcome to Room Reservation</LoginWelcomeMessage>
                <LoginForm onSubmit={this.submitHandler}>
                    <div>
                        <label>E-mail</label>
                        <LoginInput innerRef={(email) => this.email = email} />
                    </div>
                    <div>
                        <label>Password</label>
                        <LoginInput type="password" innerRef={(pass) => this.pass = pass} />
                    </div>
                    <div>
                        {this.state.loginResult}
                    </div>
                    <LoginButtonInv type='submit'>Login with email</LoginButtonInv>
                </LoginForm>
                <LoginButtonsDiv>
                    
                    <LoginButton onClick={this.loginWithFb.bind(this)}>Login with Facebook</LoginButton>
                </LoginButtonsDiv>
            </LoginWrapper>
        );
    }

}

export default Login