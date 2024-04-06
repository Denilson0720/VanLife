import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem("userId")
    const location = useLocation()
    // if isLoggedIn is not in our session localStorage
    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first!",
                    from: location.pathname
                }} 
                replace
            />)
    }
    // if isLoggedIn is present in localStorage, render outlet
    return <Outlet />
}