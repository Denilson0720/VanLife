import React from "react"
import { Link, NavLink,useNavigate } from "react-router-dom"
import loginIcon from "/assets/images/avatar-icon.png"
import logoutIcon from '../assets/images/logout.png'
import { CiLogout } from "react-icons/ci";
import {useContext} from 'react'
import { LoggedInContext } from "./Layout";

export default function Header() {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext)
    const navigate = useNavigate()
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        // localStorage.removeItem("user")
        // clear all values of user
        localStorage.clear();
        console.log(isLoggedIn);
    }
 
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
            </nav>
                {
                isLoggedIn ?(
                    // logout
                    // <CiLogout
                    //     // delete user from localStorage
                    //     className="logout-button"
                    //     onClick={()=>{
                    //         fakeLogOut()
                    //         setIsLoggedIn(x=>!x)
                    //         navigate('/login')
                    //     }}
                    // />
                    <img
                        src ={logoutIcon}
                        className = 'logout-icon'
                        onClick={()=>{
                            fakeLogOut()
                            setIsLoggedIn(x=>!x)
                            navigate('/login')
                        }}
                    />
                ):
                (   
                // upon succesful submit at login, places user into localStorage
                    <Link to="login" className="login-link">
                        <img
                            src={loginIcon}
                            className="login-icon"
                        />
                    </Link>
                )
                }
        </header>
    )
}