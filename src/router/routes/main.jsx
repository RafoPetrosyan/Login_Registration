import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthGuard from "../../utils/guards/auth.guards";
import About from "../../views/main/About/About";
import Home from "../../views/main/Home/Home";



const main = () => {
    return (    
        <>
            <Routes>
                <Route path="/" element={<AuthGuard element={<Home/>} />} >
                    <Route path="/about" element={<About/>} />
                </Route>
            </Routes>
        </>
    )
}

export default main;

