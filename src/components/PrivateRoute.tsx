import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
    isAuth: boolean;
}

const PrivateRoute: React.FC<Props> = ({isAuth, children, ...rest}) => {
    // return props.isAuth ? (
    //     <Route {...props} />
    // ) : (<Redirect to={{pathname: props.redirectPath}} />);
    return (
        <Route
            {...rest}
            render={() => {
                return isAuth ? children : <Redirect to='/' />
            }}
        />
    );
}

export default PrivateRoute;
