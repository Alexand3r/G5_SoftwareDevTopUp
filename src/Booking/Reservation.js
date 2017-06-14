import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {ReservationInput} from './styles'
class Reservation extends Component {
    render() {
        return (
            <div>
                <div>
                    <label>Reservation start date and time:</label><br/>
                    <ReservationInput readOnly  value={this.props.startDate.toLocaleString().split(",",1)} />
                    <ReservationInput readOnly  value={this.props.startDate.toLocaleString().split(",",2)[1]} />
                </div>
                <div>
                    <label>Reservation end date and time:</label><br/>
                    <ReservationInput readOnly value={this.props.endDate.toLocaleString().split(",",1)} />
                    <ReservationInput readOnly value={this.props.endDate.toLocaleString().split(",",2)[1]} />
                </div>
            </div>
        );
    }
}
Reservation.PropTypes={
    startDate:PropTypes.object.isRequired,
    endDate:PropTypes.object.isRequired
}
export default Reservation;