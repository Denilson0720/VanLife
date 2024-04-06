import React from "react"
import { useLocation, useNavigate,Link } from "react-router-dom"
import { loginUser } from "../api"
import { useContext } from "react"
import { LoggedInContext } from "../components/Layout"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);

    const from = location.state?.from || "/host";

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")

        loginUser(loginFormData)
        // if succesful
        // push returned user to localStorage
            .then(data => {
                setError(null)
                localStorage.setItem('userId',data[0].id)
                navigate(from, { replace: true })
                setIsLoggedIn(x=>!x)
            })
            // if loginUser fails set new Error state
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }
    // upkeep the state of our login data
    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    function changeLoggin(){
        // setIsLoggedIn(x=>!x)
        console.log(isLoggedIn);
    }
    return (
        <div className="login-container">
            {
                location.state?.message &&
                    <h3 className="login-error">{location.state.message}</h3>
            }
            <div className = 'demo-login-ctn'>
                <h3>Welcome! To fully demo #VanLifes Hosting Routes Capabilities use the below credentials:</h3>
                <p><b>email:</b> demo@testing.com</p>
                <p><b>password:</b> p123</p>
            </div>
            <h1>Sign in to your account</h1>
            {
                error?.message &&
                    <h3 className="login-error">{error.message}</h3>
            }

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button
                    disabled={status === "submitting"}
                >
                    {status === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>
            <p>Dont have an account? <Link style={{'fontWeight':'600','textDecoration':'bold','color':'#ff8c38'}} to='/register'>Register for one!</Link></p>
        </div>
    )

}