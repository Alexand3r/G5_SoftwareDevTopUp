import styled, { css } from 'styled-components'


export const BookingDiv = styled.div`
margin:50px;
border:3px royalblue;
border-radius:5px;
background:royalblue;
color:white;
`
// export const BookingTable = styled(Table) `
// border:3px royalblue;
// border-radius:5px;
// background:#efefef;
// color:black;
// width: 100%;
// border-collapse: collapse;
// `

export const TableHeader = styled.div`
    padding: 15px;
    text-align: center;
    width:100%;
`

export const HeaderButton= styled.button`
    border: 1px solid white;
    border-radius: 3px;
    background: white;
    color:royalblue;
    padding-left:5px;
    padding-right:5px;
    margin:1px;
`
export const HeaderLabel = styled.label`
    font-size: 20px;
    color:white;
`

export const ConfirmButton = styled.button`
margin-top:10px;
border-radius:3px;
border: 1px solid white;
height:40px;
&:hover{
    background-color:#34495D;
    border: 1px solid #34495D;
    color:white;
}
`
export const BigCalendarDiv = styled.div`
${(props)=>props.hidden===true&& css`
    visibility:hidden;
`}
`
export const ConfirmButtonInv = styled.button`
margin-top:10px;
border-radius:5px;
border: 1px solid white;
height:40px;
color:white;
width:100%;
background-color:#2C3E50;
&:hover{
    background-color:#34495D;
}
box-sizing: border-box;
`
export const ReservationInput = styled.input`
width:50%;
padding:12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`
export const ButtonDiv = styled.div`
clear:both;
position:absolute;
bottom:0;
width:95%;
padding-bottom:30px;
`