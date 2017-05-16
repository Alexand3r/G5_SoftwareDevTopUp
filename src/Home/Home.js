import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import {fAuth} from '../data/config/firebase'
import {logout} from '../data/api/auth'
import Register from '../Register/Register'
import LoginContainer from '../Login/LoginContainer'
import BookingList from '../Booking/BookingList'
import App from '../App'
import * as s from './styles'

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
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <s.HeaderDiv>
              <s.Logo>
                <Link to="/" className="navbar-brand">G5 Booking System</Link>
              </s.Logo>
              <s.HeaderList>
                <s.HeaderLabel>
                  <Link to="/" className="navbar-brand">Home</Link>
                </s.HeaderLabel>
                <s.HeaderLabel>
                  <Link to="/booking" className="navbar-brand">BookingList</Link>
                </s.HeaderLabel>
                <s.HeaderLabel>
                  {this.state.loggedIn
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </s.HeaderLabel>
              </s.HeaderList>
            </s.HeaderDiv>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={App} />
                <PublicRoute loggedIn={this.state.loggedIn} path='/login' component={LoginContainer} />
                <PublicRoute loggedIn={this.state.loggedIn} path='/register' component={Register} />
                <PrivateRoute loggedIn={this.state.loggedIn} user={this.user} path='/booking' component={BookingList} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default Home;