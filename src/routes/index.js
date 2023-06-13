import React from 'react'
import { useRoutes } from 'react-router-dom'
import Login from '../login/login';
import Error from '../pages/error';
import HomeScreen from '../pages/eventPage';

export default function WebRouter() {
  let routes = useRoutes ([
    {path: "/", element: <HomeScreen/>},
    {path: "/login", element: <Login/>},
    {path: "*", element: <Error />},
    ]);
    return  routes;
}
