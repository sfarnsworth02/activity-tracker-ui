import React from 'react';
import Config from '../../config';
import NewHabit from './Activity.Create';

function ActivityItem (props)
{
    return(
        <li>
            <span> {props.activity} </span>
            <button onClick={props.editActivity}>Edit</button>
            <button onClick={props.deleteActivity} item={props.id}>Delete</button>
        </li>
    )
}

export default class HabitList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activities: [],
        }
    }
    getActivityList = async () =>
    {
        const activityUrl = `${Config.basePath}/activity`;
        fetch(activityUrl)
        .then((response) =>
        {
            return response.json();
        })
        .then((result) => 
        {
            this.setState({
                activities: result.map((item) =>
                {
                    return <ActivityItem
                        key={item._id} 
                        // why didn't this work but id did when sending it through props
                        id={item._id}
                        activity={item.activity}
                        description={item.description}
                        duration={item.duration}
                        start={item.start}
                        editActivity={this.editActivity}
                        deleteActivity={this.deleteActivity}
                         />
                }),
            })
        })
    }
    editActivity = (e) =>
    {

    }

    deleteActivity = (e) =>
    {
        e.preventDefault();
        const key = e.target.getAttribute('item')
        console.log('key: ', key)
        let ActivityUrl = `${Config.basePath}/activity/${key}`;
        let fetchOptions = {
            headers: { 'Content-Type':'application/json'},
            method: 'DELETE',
            mode:'cors',
        };
        fetch(ActivityUrl, fetchOptions)
        .then((response) =>
        {
            if(response.status !== 200)
            {
                return ('Fetch response unsuccessful. Method=Delete: ', response)
            }
            return response.json();
        })
        .then((result) =>
        {
            this.setState(this.getActivityList());
            return console.log('Result: ', result)
        })
        .catch((err) => 
        {
            if(err)
            {
                console.log('Catching fetch error: ', err);
            }
        })
    }

    
    componentDidMount()
    {
        this.getActivityList();
    }

    componentWillUnmount()
    {
        this.getActivityList();
    }

    render()
    {
        return(
            <div>
                <NewHabit />
                <ul>
                    {this.state.activities}
                </ul>  
            </div>
            
        )
    }
}