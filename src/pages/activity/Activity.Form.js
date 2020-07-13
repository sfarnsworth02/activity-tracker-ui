import React from 'react';
import Config from '../../config';

export default class ActivityForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            title: props.title,
            editing: props.editing,  
            isVisible: null,
            activity: props.activity,
        }
    }
    
    handleChange = (e) =>
    {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value });
    }

    update = (e) =>
    {
        e.preventDefault();
        console.log('lets update some shit');
    }

    render()
    {
        console.log('render form props: ', this.state)
        return(
            <div>
                <h3>{this.state.title}:</h3>
                <span>{this.state.message}</span>
                <form className='create-habit-form' onSubmit={this.handleNewActivity}>
                    <ul>
                        <input 
                            type='text'
                            name='activity'
                            value={this.state.activity}
                            onChange={this.handleChange} />
                        <input type='submit' value='Save' />
                    </ul>
                </form>
            </div>
        )
    }
}