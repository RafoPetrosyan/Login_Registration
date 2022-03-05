import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../utils/guards/auth.guards";
import AuthGuardLogin from "../utils/guards/auth.guards.login.page";
import Login from "../views/auth/Login/Login";
import Registration from "../views/auth/Registration/Registration";
import About from "../views/main/About/About";
import Home from "../views/main/Home/Home";
import Auth from "./routes/Auth/Auth";
import Main from "./routes/Main/Main";


const RouterView = () =>{
    return (
        <>
            <Routes>

                <Route path="/auth" element={<AuthGuardLogin/>}>
                    <Route path="/auth" element={<Auth/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="registration" element={<Registration/>}/>
                    </Route>
                </Route>

                <Route path="/" element={<AuthGuard/>} >
                    <Route path="/" element={<Main/>}>
                        <Route path='home' element={<Home/>} />
                        <Route path='about' element={<About/>} />
                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default RouterView;
