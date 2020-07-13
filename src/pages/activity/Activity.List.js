import React from 'react';
import Config from '../../config';
import Form from './Activity.Form';

// const ActvContext = React.createContext({})

function ActivityItem (props)
{
    return(
        <li>
            <span>{props.index}-</span>
            <span> {props.activity} </span>
            <button onClick={props.editActivity} index={props.index}>Edit</button>
            <button onClick={props.deleteActivity} item={props.id}>Delete</button>
        </li>
    )
}

export default class List extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            editing: null,
            activities: [],
            activity:'',
            index:'',
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
                activities: result.map((item, i) =>
                {
                    return <ActivityItem
                        key={item._id} 
                        index={i}
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
        e.preventDefault();
        const i = e.target.getAttribute('index');
        const index = this.state.activities[i].props.index;
        const activity = this.state.activities[i].props.activity;
        this.setState({
            editing:'Edit',
            index: index,
            activity: activity,
        });
        console.log('editActivity checking state: ', this.state.index);
        console.log('editActivity e.target.activty is: ', activity);
        console.log('editActivity editing? ', this.state.editing)
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

    componentDidMount()
    {
        this.getActivityList();
    }

    render()
    {
        return(
            <div>
                {/* <ActvContext.Provider value={this.state}> */}
                    <Form
                        title={this.state.editing !== "Edit" ? "Create a new Activity": "Update activity"}
                        activity={this.state.activity}
                        onUpdate={this.editActivity} />
                        <span>current activity is: {this.state.activity} {this.state.description}</span>
                    <ul>
                        <span>{this.state.activities}</span>
                    </ul>  
                {/* </ActvContext.Provider> */}
            </div>
            
        )
    }
}