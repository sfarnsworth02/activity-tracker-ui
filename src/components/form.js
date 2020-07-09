import React from 'react';

export function TextField(props)
{
    return(
        <div>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}