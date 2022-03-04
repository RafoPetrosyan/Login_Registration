import React from "react";
import AuthRoute from './routes/auth'
import MainRoute from './routes/main'

const RouterView = () =>{
    return (
        <>
            <MainRoute/>
            <AuthRoute/>
        </>
    )
}

export default RouterView;