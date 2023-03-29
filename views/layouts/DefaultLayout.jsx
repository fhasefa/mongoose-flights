import React from 'react'

function DefaultLayout(props) {

    return(
        <html>
            <head>
                <title>{props.title}</title>
                <link rel="stylesheet" />
            </head>
            <body>
                <nav>
                    <ul>
                        <li><a href="/flights">ALL FLIGHTS</a></li>
                        <li><a href="/flights/new">ADD FLIGHT</a></li>
                    </ul>
                </nav>
                <div>
                    {/* // renders everything inside the wrapping component tags */}
                    {props.children}
                </div>
            </body>
        </html>
    )
}

export default DefaultLayout