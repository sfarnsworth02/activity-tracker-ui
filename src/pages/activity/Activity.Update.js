import React from 'react';
import Config from '../../config';

export default function UpdateActivity(props)
{

    return(
        <div>
            <h3>Update activity:</h3>
                <form className='create-habit-form' onSubmit={props.editActivity}>
                    <ul>
                        <label htmlFor='activity'>New Activity</label>
                        <input 
                            type='text'
                            name='activity'
                            value={props.activity}
                            onChange={this.handleChange} />
                        <label htmlFor='description'>Description</label>
                        <input 
                            type='text'
                            name='description'
                            value={this.state.description}
                            onChange={this.handleChange} />
                        <label htmlFor='duration'>Duration</label>
                        <input 
                            type='number'
                            name='duration'
                            value={this.state.duration}
                            onChange={this.handleChange} />
                        <input type='submit' />
                    </ul>
                </form>
        </div>
    )
}