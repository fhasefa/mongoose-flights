import React from 'react'
import DefaultLayout from './layouts/DefaultLayout'

function Index(props) {
    // can't use hooks or state 
    // can't use event listeners in the same way
    const currentDate = new Date()
    return (
        <DefaultLayout title="Index view">
            <h1>Flights</h1>
            <ul>
                {props.result.map((x, index) => 
                    <li key={index} style={x.departs.getTime() < currentDate.getTime() ? {color: 'red'} : {color: 'inherit'}}>
                        <span>Airline: <strong>{x.airline}</strong></span> <br />
                        <span>FlightNo: {x.flightNo}</span> <br />
                        <span>Date/Time: {x.departs.toLocaleDateString()} <strong>//</strong> {x.departs.toLocaleTimeString()}</span> <br />
                        <a href={`/flights/${x._id}`}>Flight Detail</a>
                        <br /><br />
                    </li>
                )}
            </ul>
            <a href="/flights/new">Add...</a>
        </DefaultLayout>
    )
}

export default Index