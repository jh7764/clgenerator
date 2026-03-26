import React from 'react'

function Story({ value, onChange }) {

    return(
        <textarea 
            value = {value}
            onChange = {onChange}
            rows = {5}
            cols = {40}
        />
    )
}

export default Story;