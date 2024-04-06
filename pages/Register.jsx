import React from 'react'
import { useLocation, useNavigate,Link } from "react-router-dom"
import {registerUser} from '../api'
import {useId} from 'react'
export default function Register(){
    const [regFormData, setRegFormData] = React.useState({name:"",email:"", password:"",userId:""})
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    
    const id = useId();
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        setStatus('registeration in progress')
        registerUser(regFormData)
        // if registration successful add user to localStorage
            .then(data=>{
                localStorage.setItem('userId',regFormData.userId)
            })
        // if registration successful,navigate to vans
            .then(navigate('/vans'))
        }
    function handleChange(e) {
        const { name, value } = e.target
        // look for the value with that specific name and change its value to the new value
        setRegFormData(prev => ({
            ...prev,
            [name]: value,
            // identifier prefix with useId hook, no two ids will be the same
            userId: regFormData.email+id
        }))
        console.log(regFormData);
    }

    return(
        <>
            <Link
                to="/login"
                relative="path"
                className="back-button"
            > &#8592; <span>Back to Login</span></Link>
        <div className = 'register-container'>
            <h1>Register for a #VanLife Account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                    <input
                        name="name"
                        onChange={handleChange}
                        type="string"
                        placeholder="Name"
                        value={regFormData.name}
                    />
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email address"
                        value={regFormData.email}
                    />
                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        value={regFormData.password}
                    />
                
                    <button
                        disabled={status === "submitting"}
                    >
                        {status === "submitting"
                            ? "Registerring..."
                            : "Register"
                        }
                    </button>
            </form>
        </div>
        </>
    )
}