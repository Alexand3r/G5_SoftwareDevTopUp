import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { fAuth } from '../data/config/firebase'
import { logout } from '../data/api/auth'
import Register from '../Register/Register'
import Login from '../Login/Login'
import BookingList from '../Booking/BookingList'
import Members from '../Members/Members';
import AdminLogin from '../Admin/AdminLogin/Admin'
// import App from '../App'
import * as s from './styles'
import g5logo from '../assets/G5LOGOMono.png'
function PrivateRoute({ component: Component, loggedIn, ...rest }) {
    
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
    )
}
function PublicRoute({ component: Component, loggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === false
                ? <Component {...props} />
                : <Redirect to='/' />}
        />
    )
}

class Home extends Component {
    state = {
        loggedIn: false,
        loading: true,
    }
    componentDidMount() {
        this.removeListener = fAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true,
                    loading: false
                })
            } else {
                this.setState({
                    loggedIn: false,
                    loading: false
                })
            }
        })
    }
    componentWillUnmount() {
        this.removeListener()
    }
    render() {
        //TODO Add a more friendly Loading screen
        return this.state.loading === true ? <s.LoadingTag>Loading</s.LoadingTag> : (
            <BrowserRouter>
                <div>
                    <s.HeaderDiv>
                        <s.sLink to="/" ><img height={80} src={g5logo} alt='G5Logo' /></s.sLink>

                        <s.HeaderList>
                            <s.HeaderLabel>
                                <s.sLink to="/booking">Booking List</s.sLink>
                            </s.HeaderLabel>
                            <s.HeaderLabel>
                                <s.sLink to="/members">Members</s.sLink>
                            </s.HeaderLabel>
                            <s.HeaderLabel>
                                <s.sLink to="/booking">Chat Support</s.sLink>
                            </s.HeaderLabel>
                            <s.HeaderLabel>
                                {this.state.loggedIn
                                    ? <s.sLink
                                        to="/"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            logout()
                                        }}
                                    >Logout</s.sLink>
                                    : <span>
                                        <s.sLink to="/login">Login</s.sLink>
                                    </span>}
                            </s.HeaderLabel>
                            {this.state.loggedIn
                                ?
                                null
                                : <s.HeaderLabel>
                                    <s.sLink to="/register">Register</s.sLink>
                                </s.HeaderLabel>}
                        </s.HeaderList>
                    </s.HeaderDiv>

                    <s.ContentDiv>
                        <div>
                            <Switch>
                                <Route path='/' exact render={() =>
                                    (this.state.loggedIn ? <Redirect to="/booking" /> : <Redirect to="/login" />)} />
                                <PublicRoute loggedIn={this.state.loggedIn}
                                    path='/login' component={Login} />
                                <PublicRoute loggedIn={this.state.loggedIn}
                                    path='/register' component={Register} />
                                <PrivateRoute loggedIn={this.state.loggedIn} user={this.user}
                                    path='/booking' component={BookingList} />
                                <PrivateRoute loggedIn={this.state.loggedIn} user={this.user}
                                    path='/members' component={Members} />
                                <Route render={() => <h3>404 Page not found</h3>} />
                            </Switch>
                            <PublicRoute loggedIn={this.state.loggedIn} path='/admin/login' component={AdminLogin} />
                        </div>
                    </s.ContentDiv>
                </div>
            </BrowserRouter>
        );
    }
}


export default Home;