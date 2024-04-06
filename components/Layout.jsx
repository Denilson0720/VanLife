import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import {createContext} from 'react'
import Login from "../pages/Login"
const LoggedInContext = createContext();
export default function Layout() {
    const [isLoggedIn,setIsLoggedIn]  = React.useState(localStorage.getItem('userId')?true:false)
    // const isLoggedIn = false;
    // have some form of useEffect run everytime the isLoggedIn state changes
    // useEffect will render Outlet everytime state changes
    return (
        <LoggedInContext.Provider value = {{isLoggedIn,setIsLoggedIn}}>
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
        </LoggedInContext.Provider>
    )
    // export {LoggedInContext}
}
export {LoggedInContext}
