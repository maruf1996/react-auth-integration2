import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children,...rest}) => {
    // const {children,...rest}=props;
    const {user}=useAuth();
    return (
        < Route
            {...rest}
            render={({location})=>user.displayName? 
            children : 
            <Redirect
            to={{
                pathname:'/login',
                state:{from:location}
            }}
            ></Redirect>}
        >
            
        </Route>
    );
};

export default PrivateRoute;