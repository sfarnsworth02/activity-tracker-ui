import React, { useContext } from 'react';
import Config from '../../config';
import { render } from 'node-sass';
// import NewActivity from './Activity.Create';

const ActionContext = React.createContext({});

function ActivityItem (props)
{
    return(
        <li>
            <span> {props.activity} </span>
            <button onClick={props.editActivity} item={props.index}>Edit</button>
            <button onClick={props.deleteActivity} item={props.id}>Delete</button>
        </li>
    )
}

class ActivityForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activity: '',
            description: '',
            duration: '', 
        }
    }
    handleChange = (e) =>
    {
        e.preventDefault();
        let fieldName = e.target.getAttribute('name');
        const activityObj = {};
        activityObj[fieldName] = e.target.value;
        this.setState(activityObj);
        console.log('activity object is: ', activityObj)
    }
    render()
    {
        return(
            <div>
                <h3>{this.context.action}:</h3>
                <form className='create-habit-form' onSubmit={this.props.NewActivity}>
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
ActivityForm.contextType = ActionContext;
export default class ActivityList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            activities: [],
            id:'',
            activity:'',
            description:'',
            duration:'',
            action:'Create',
            activity:{},
            data:[],
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
            // need to be able to call this from the Activity.Create.js file...not sure if I set the structure correctly for this
            this.setState({
                data:result,
                activities: result.map((item, i) =>
                {
                    return <ActivityItem
                        key={item._id} 
                        index={i}
                        // why didn't the key attribute work but id did when sending it through props
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
    NewActivity = (e) =>
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
            return console.log('Result: ', result);
        })
        .catch((err) => {
            if(err)
            {
                console.log('Catching fetch error: ', err);
            }
        });
    }    
    editActivity = (e) =>
    {
        e.preventDefault();
        let id = e.target.getAttribute('item');
        let item = this.state.data[id];
        console.log('item: ', item);
        this.setState({activity: item, action:'edit'});
        return console.log('edit event: ', id);
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
                <ActionContext.Provider value={this.state}>
                    {/* <NewActivity /> */}
                    <ActivityForm />
                    <ul>
                        {this.state.activities}
                    </ul>  
                </ActionContext.Provider>
                
            </div>
            
        )
    }
}