import {Navigate, useLocation} from 'react-router-dom';
import React from 'react';
import {useSelector} from "react-redux";
import {getIsAuthChecked, getUser} from "../services/user/slice.ts";

interface Props {
    onlyUnAuth?: boolean,
    component: React.JSX.Element;
}

export const ProtectedRouteElement = ({onlyUnAuth = false, component}: Props): React.JSX.Element => {
    const isAuthChecked = useSelector(getIsAuthChecked);
    const user = useSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p>Загрузка...</p>
    }

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: '/'}};
        return <Navigate to={from}/>;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    // !onlyUnAuth && user
    // onlyUnAuth && !user
    return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({component}: { component: React.JSX.Element }): React.JSX.Element =>
    <ProtectedRouteElement component={component} onlyUnAuth={true}/>;
