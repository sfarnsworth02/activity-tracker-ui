import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../Context';

export default class SecureRoute extends React.Component {
    render()
    {
        let { component, path } = this.props;
        let name = this.context.userContext;
        console.log('component: ', component);
        console.log('path: ', path);
        if(!name)
        {
            component = <Redirect to='/SignIn' />
        }

        return(
            <Route exact path= { path }>
                { component }
            </Route>
        )
    }
}

SecureRoute.contextType = userContext;
