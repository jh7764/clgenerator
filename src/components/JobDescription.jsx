import React from 'react'

function JobDescripition({ value, onChange }) {

    return(
        <textarea 
            value = {value}
            onChange = {onChange}
            rows = {5}
            cols = {40}
        />
    )
}

export default JobDescripition;