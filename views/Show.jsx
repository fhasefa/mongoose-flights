import React from 'react'

function Show(props) {
    let airportsDestinations = ['AUS', 'DAL', 'LAX', 'SAN', 'SEA']
    let airportsInObjt = [] 
    
    for (let i = 0; i < props.result.destinations.length; i++) {
        airportsInObjt.push(props.result.destinations[i].airport.toString())
    }
    
    for (let i = 0; i < airportsInObjt.length; i++) {
        const index = airportsDestinations.findIndex(item => item == airportsInObjt[i])
        airportsDestinations.splice(index, 1)
    }

    const styles = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '1rem'
    }

    const destinationBoxStyles = {
        backgroundColor: '#388E3C',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem'
    }

    const btnStyles = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer'
    }

    return (
        <div style={styles}>
            <h1>Flight View</h1>
            <h2>Departs</h2>
            <h3>Airline: {props.result.airline} </h3>
            <h3>FlightNo: {props.result.flightNo}</h3>
            <h4>From: {props.result.airport}</h4>
            <h4>Date: {props.result.departs.toLocaleDateString()}</h4>
            <h4>Time: {props.result.departs.toLocaleTimeString()}</h4>
            <br /><br />

            {props.result.destinations.length ?
                <>
                    <p>Destinations:</p>

                    {props.result?.destinations?.sort((a, b) => a.arrival.getTime() - b.arrival.getTime()).map((destination, index) => 
                        <div style={destinationBoxStyles} key={index}>
                            <p>To: {destination.airport}</p>
                            <p>Arrival: {destination.arrival.toLocaleDateString()} at {destination.arrival.toLocaleTimeString()}</p>
                            <br /><br />
                        </div>
                    )}
                </>
                :
                <>
                    Destinations: TBD
                    <br/><br/>
                </>
            }
            <br /><br />
            <details className="add-destination">
                <summary style={{...btnStyles, backgroundColor: '#388E3C'}}>ADD DESTINATION</summary>
                <br /><br />
                <form action={`/flights/${props.result._id}/destinations`} method="POST">
                    <label htmlFor="airport">Select Airport:</label><br />
                    <select id="airport" name="airport" style={{padding: '0.5rem'}}>
                        {airportsDestinations.map((destination, index) => 
                            <div key={index}>
                                <option value={destination}>{destination}</option>
                            </div>
                        )}
                    </select>

                    <br /><br />

                    <label htmlFor="arrival">Arrival:</label><br />
                    <input type="datetime-local" id="arrival" name="arrival" defaultValue={props.departsDate}/><br /><br />
                    <button className="btn-destination" style={btnStyles}>ADD DESTINATION</button>
                </form>
            </details>

            <a href="/flights" style={{...btnStyles, backgroundColor: '#388E3C'}}>Back</a>

        </div>
    )
}

export default Show;