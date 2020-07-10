import React from 'react';
import Config from '../../config';

export default class ActivityForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            action: props.action,
            activity: props.activity,
            description: props.description,
            duration: props.duration,
            message: '',
        }
    }

    handleChange = (e) =>
    {
        e.preventDefault();
        let fieldName = e.target.getAttribute('name');
        const activityObj = {};
        activityObj[fieldName] = e.target.value;
        this.setState(activityObj);
    }

    handleNewActivity = (e) =>
    {
        e.preventDefault();
        let path = Config.basePath;
        let body = ['activity', 'description', 'duration'];
        let dataBody = {};
        for (let i=0; i<body.length; i++)
        {
            const field = body[i];
            dataBody[field] = this.state[field];
        };
        console.log('dataBody: ', dataBody);
        let fetchOptions = {
            headers: { 'Content-Type':'application/json' },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(dataBody)
        };
        let activityUrl = `${path}/activity`;
        fetch(activityUrl, fetchOptions)
        .then((response) => {
            if(response.status !== 200)
            {
                return ('Fetch response unsuccessful: ', response)
            }
            return response.json();
        })
        .then((result) => {
            if(result.status !== 200)
            {
                return ('Fetch result unsuccessful: ', result);
            }
            this.setState({message:`New activity created:  ${result}`})
            return(console.log('Fetch result a success! ', result));
        })
        .catch((err) => {
            if(err)
            {
                console.log('Catching fetch error: ', err);
            }
        });
    }

    render()
    {
        return(
            <div>
                <h3>{this.state.action}:</h3>
                <form className='create-habit-form' onSubmit={this.handleNewActivity}>
                    <ul>
                        <label htmlFor='activity'>New Activity</label>
                        <input 
                            type='text'
                            name='activity'
                            value={this.state.activity}
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
}