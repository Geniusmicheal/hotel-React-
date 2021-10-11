import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { ServiceContext } from './ContextApi';

function PrivateRoute({component: Component, ...rest }) {
    const cardContext_ = useContext(ServiceContext);
    const {user } = cardContext_;
    const check = (user && user?.isAdmin)? true:false;
 
    return (
      <Route {...rest} render={props => {
          return check? <Component {...props} /> : <Redirect to="/control"/>
      }} ></Route>
    )
}

export default PrivateRoute;