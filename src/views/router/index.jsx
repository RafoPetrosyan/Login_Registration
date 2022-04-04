import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutComponent from "../../components/Layout/Layout";
import AdminGuard from "../../utils/guards/adminGuard";
import AdminGuardLogin from "../../utils/guards/adminGuardLogin";
import AuthGuard from "../../utils/guards/auth.guards";
import AuthGuardLogin from "../../utils/guards/auth.guards.login.page";
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
import Auth from "../auth";
import Login from "../auth/Login/Login";
import Registration from "../auth/Registration/Registration";
import Main from "../main";
import About from "../main/About/About";
import Home from "../main/Home/Home";
import NoMatch from "../noMatch/NoMatch";
import EditeAndCreateEvent from "../admin/Events/EditeAndCreate/EditeAndCreate";
import AddUser from "../admin/Users/EditeAndAdd/AddUser";
import EditeUser from "../admin/Users/EditeAndAdd/EditeUser";


const RouterView = () =>{
    
    return (
        <>
        <Routes>
            <Route path="/" element={<LayoutComponent/>}>

                <Route path="/" element={<AuthGuardLogin/>}>
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

            </Route>



                {/* Admin */}
            <Route path="/admin/login" element={<AdminGuardLogin />}>
                <Route path="" element={<LoginAdmin />}/>
            </Route>

            <Route path="/admin" element={<AdminGuard/>}>
                <Route path="/admin" element={<Admin/>}>
                    {/* Events */}
                    <Route path="events" element={<Events/>}/>
                    <Route path="events/create" element={<EditeAndCreateEvent/>}/>
                    <Route path="events/edite">
                        <Route path=":id" element={<EditeAndCreateEvent/>}/>
                    </Route>
                    {/* Users */}
                    <Route path="users" element={<Users/>}/>
                    <Route path="users/create" element={<AddUser/>}/>
                    <Route path="users/edite" >
                        <Route path=":id" element={<EditeUser/>}/> 
                    </Route>
                    {/* Types */}
                    <Route path="types" element={<Types/>}/> 
                    {/* Support */}
                    <Route path="support" element={<Support/>}/>
                    {/* Reports */}
                    <Route path="reports" element={<Reports/>}>
                        <Route path="" element={<Report/>}/>
                        <Route path="users" element={<ReportUsers/>}/>
                        <Route path="events" element={<ReportEvents/>}/>
                        <Route path="comments" element={<ReportComments/>}/>
                    </Route>
                </Route>
            </Route>


             <Route path="*" element={<NoMatch/>}/> 
        </Routes>
        </>
    )
}

export default RouterView;
