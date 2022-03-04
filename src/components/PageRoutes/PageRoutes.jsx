import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute ";
import styles from './PageRoutes.module.css';
import About from "../Pages/About/About";

const PageRoutes = () =>{
    return (
        <div className={styles.mainDiv}>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/home" element={ <ProtectedRoute element={<Home/>}/> }/>
                <Route path="/about" element={ <ProtectedRoute element={<About/>}/>}/>
            </Routes>
        </div>
    )
}

export default PageRoutes;