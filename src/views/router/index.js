import React from "react";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import LayoutComponent from "../../components/Layout/Layout";
import AdminGuardHome from "../../utils/guards/AdminGuardHome";
import AdminGuardLogin from "../../utils/guards/AdminGuardLogin";
import AuthGuardHome from "../../utils/guards/AuthGuardHome";
import AuthGuardLogin from "../../utils/guards/AuthGuardLogin";
import Admin from "../admin";
import Events from "../admin/Events/Events";
import LoginAdmin from "../admin/AdminComponents/LoginAdmin/LoginAdmin";
import Reports from "../admin/Reports";
import Report from "../admin/Reports/Report/Report";
import ReportComments from "../admin/Reports/ReportComments/ReportComments";
import ReportEvents from "../admin/Reports/ReportEvents/ReportEvents";
import ReportUsers from "../admin/Reports/ReportUsers/ReportUsers";
import Support from "../admin/Support/Support";
import Types from "../admin/Types/Types";
import Users from "../admin/Users/Users";
import Login from "../auth/Login/Login";
import Registration from "../auth/Registration/Registration";
import About from "../main/About/About";
import Home from "../main/Home/Home";
import PageNotFound from "../pageNotFound/PageNotFound";
import EditeAndCreateEvent from "../admin/Events/EditeAndCreate/EditeAndCreate";
import AddUser from "../admin/Users/EditeAndAdd/AddUser";
import EditeUser from "../admin/Users/EditeAndAdd/EditeUser";
import EditeAndCreateTypes from "../admin/Types/EditeAndCreate/EditeAndCreateTypes";
import EditeAndCreateReport from "../admin/Reports/Report/EditeAndCreateReport/EditeAndCreateReport";
import Chat from "../admin/Support/Chat/Chat";

import history from './browserHistory';



const RouterView = () =>{
    
    return (
        <HistoryRouter history={history}>
            <Routes>

                <Route path="/" element={<LayoutComponent/>}>

                    <Route path="/auth" element={<AuthGuardLogin/>}> 
                        <Route path="login" element={<Login/>}/>
                        <Route path="registration" element={<Registration/>}/>
                    </Route>

                    <Route path="/" element={<AuthGuardHome/>} >
                        <Route path='home' element={<Home/>} />
                        <Route path='about' element={<About/>} />
                    </Route>

                </Route>


                {/* ADMIN */}
                    
                <Route path="/admin/login" element={<AdminGuardLogin />}>
                    <Route path="" element={<LoginAdmin />}/>
                </Route>

                <Route path="/admin" element={<AdminGuardHome/>}>

                    <Route path="/admin" element={<Admin/>}>

                        {/* EVENTS */}
                        <Route path="events" element={<Events/>}/>
                        <Route path="events/create" element={<EditeAndCreateEvent/>}/>
                        <Route path="events/edite/:id" element={<EditeAndCreateEvent/>}/>
                       
                        {/* USERS */}
                        <Route path="users" element={<Users/>}/>
                        <Route path="users/create" element={<AddUser/>}/>
                        <Route path="users/edite/:id" element={<EditeUser/>}/>
                        

                        {/* TYPES */}
                        <Route path="types" element={<Types/>}/>
                        <Route path="types/create" element={<EditeAndCreateTypes/>}/>
                        <Route path="types/edite/:id" element={<EditeAndCreateTypes/>}/>


                        {/* SUPPORT */}
                        <Route path="support" element={<Support/>}>
                            <Route path=":id" element={<Chat/>}/>
                        </Route>
                        

                        {/* REPORTS */}
                        <Route path="reports" element={<Reports/>}>
                            <Route path="" element={<Report/>}/>
                            <Route path=":id" element={<EditeAndCreateReport/>}/>
                            <Route path="users" element={<ReportUsers/>}/>
                            <Route path="events" element={<ReportEvents/>}/>
                            <Route path="comments" element={<ReportComments/>}/>
                        </Route>
                    </Route>

                </Route>


                <Route path="*" element={<PageNotFound/>}/> 
            </Routes>
        </HistoryRouter>
    )
}

export default RouterView;
