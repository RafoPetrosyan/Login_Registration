import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../views/auth/Login/Login";
import Registration from "../../views/auth/Registration/Registration";


const auth = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
            </Routes>
        </>
    )
}

export default auth;