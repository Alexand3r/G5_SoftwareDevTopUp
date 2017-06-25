import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import CustomToolbar from './CustomComponents/Toolbar'
import ReactModal from 'react-modal'
import Reservation from './Reservation'
import {ConfirmButtonInv,ButtonDiv,BigCalendarDiv} from './styles'
import * as actions from '../data/api/reservations.js'
//example on how to add events
var events = [
    {
        'title': 'Test Reservation all day',
        'start': new Date(2017, 5, 13, 13, 0, 0),
        "end": new Date(2017, 5, 14, 14, 50, 0),
    },
    {
        'title': 'Test Reservation 2`',
        'start': new Date(2017, 5, 14, 1, 50, 0),
        "end": new Date(2017, 5, 14, 2, 50, 0),
    },
    {
        'title': 'Test reservation 3',
        'start': new Date(2017, 4, 31, 0, 0, 0),
        "end": new Date(2017, 4, 31, 2, 0, 0),
    }
]

class BookingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            slotInfo: {
                start: "",
                end: ""
            },
            events:[]
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleConfirmRequest(slotInfo){
        let data = {
            start: slotInfo.start.toLocaleString(),
            end: slotInfo.end.toLocaleString(),
            approved:false,
            rejected:false
        }
        actions.createRequest(data,()=>{},()=>{console.log('error')})
        this.handleCloseModal()
    }
    handleOpenModal(slotInfo) {
        this.setState({ showModal: true, slotInfo: slotInfo })
    }

    handleCloseModal() {
        this.setState({ showModal: false })
    }
    render() {
        BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

        let components = { toolbar: CustomToolbar }

        return (

            <div>
                <BigCalendarDiv hidden={this.state.showModal}>
                <BigCalendar
                    events={events}
                    selectable={true}
                    defaultView={'week'}
                    defaultDate={new Date()}
                    components={components}
                    onSelectSlot={(slotInfo) => { this.handleOpenModal(slotInfo) }} />
                    </BigCalendarDiv>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Reservation Details Request"
                    style={{
                        overlay: {
                            background: '#34495D'
                        },
                        content: {
                            borderRadius: 5,
                            backgroundColor: '#f2f2f2',
                            padding: 20,
                            width: '50%',
                            margin: '0 auto'
                        }

                    }}>
                    <Reservation startDate={this.state.slotInfo.start} 
                                 endDate={this.state.slotInfo.end} />
                    <ButtonDiv>
                    <ConfirmButtonInv onClick={(e)=>{e.preventDefault();this.handleConfirmRequest(this.state.slotInfo)}}> 
                        Confirm Reservation Request 
                    </ConfirmButtonInv>
                    <ConfirmButtonInv onClick={this.handleCloseModal}>
                        Cancel Request
                    </ConfirmButtonInv>
                    </ButtonDiv>
                </ReactModal>
            </div>
        );
    }

}

export default BookingList;