import React, { Component, Context } from 'react';
import config  from '../../config';

let NewUser = (e) =>
{
    return(<h3>Hi i'm new!</h3>)
}
let CurrentUser = (props) =>
{
    return(<h3>{this.props.name}</h3>)
}

export default class User extends Component {
    constructor()
    {
        super();
        this.state = {
            name: '',
            email: ''
        }
    }
    handleChange = (e) =>
    {
            const fieldName = e.target.getAttribute('name');
            const stateObj = {};
            stateObj[fieldName] = e.target.value;
            this.setState(stateObj);
    }
    getUser = (event) =>
    {
        event.preventDefault();
        let path = config.basePath;
        console.log('base path: ', path);
        // let userUrl = `http://localhost:5000/user-email/${this.state.email}`;
        let userUrl = `${path}/user-email/${this.state.email}`;
        fetch(userUrl)
        .then((response) => 
        {
            if(response.status !== 200){
                return ('Fetch response unsuccessful: ', response)
            }
            return response.json();
        })
        .then((result) =>
        {
            console.log('fetchResults: ', result);
            this.setState({
                name: result.name,
            })
        })
        .catch((err) =>
        {
            console.log('Catching fetch error for user: ', err);
        });
    }



    render()
    { 
        return(
            <form className='loginForm' onSubmit={this.getUser}>
                <label htmlFor='email'>Email</label>
                <input 
                    type='text' 
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}></input>
                <input type='submit' defaultValue='Login' />
            </form>
        )
    }
}