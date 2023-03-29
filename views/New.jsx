import React from 'react'
import DefaultLayout from './layouts/DefaultLayout';

function New(props) {
    return ( 
        <DefaultLayout title="New view">
            <h1>New Flights</h1>
            <form action="/flights" method="POST">
                <label htmlFor="arl">Airline:</label><br />
                <input type="text" id="arl" name="airline" /><br /><br />

                <label htmlFor="fln">FlightNo:</label><br />
                <input type="text" id="fln" name="flightNo" /><br /><br />

                <label htmlFor="ddt">Departure date/time:</label> <br/>
                <input
                    id="ddt"
                    type="datetime-local"
                    name="departs"
                    defaultValue={props.departsDate}
                /> <br /><br />
                 <label htmlFor="airport">Select Airport:</label><br />
                    <select id="airport" name="airport" >
                        <option value="SAN">SAN</option>
                        <option value="AUS">AUS</option>
                        <option value="DAL">DAL</option>
                        <option value="LAX">LAX</option>
                        <option value="SEA">SEA</option>
                    </select>
                <br /><br />

                <button>Submit</button>
            </form>
        </DefaultLayout>
    );
}

export default New;