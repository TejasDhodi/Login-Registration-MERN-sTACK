import React from 'react'

const HomeDetails = ({description}) => {
    return (
        <>
            <div className="home">
                <h3>{description.h3}</h3>
                <h1>{description.h1}</h1>
            </div>
        </>
    )
}

export default HomeDetails
