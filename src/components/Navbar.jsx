import etracker from "../assets/Etracker.png"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import Login from "./Login"
import { api, apiError } from "../utilities"
import Logout from "./Logout"

const Navbar = ()=>{
    const [authed, setAuthed] = useState(null)

    const checkTokenExpired = async()=>{
        const token = Cookies.get("token")
        if (!token){
            setAuthed(null)
        }else{
            setAuthed(token)
        }
        try{
            let response = await api.get("/api/auth/check",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
           setAuthed(response.data.token)

        }catch(err){
            if (err.response?.status === 403){
                Cookies.remove("token")
                setAuthed(null)
            }else{
                apiError(err, "Checking authentication and token validity")
            }
        }
    }
    useEffect(()=>{
        checkTokenExpired()
    }, [])
    



    return (
        <>
            <div id="navbar">
                <Link to="/"><img src={etracker} id='menu_image'/></Link>
                <div id="navbar_options">
                    {authed &&
                        <Link to="/track">
                            Track
                        </Link>
                    }
                    
                    <Link to="/about">
                        About
                    </Link>
                </div>
                {authed == null ?
                    <div id='loginsignuup'>
                        <Login/>
                        <Button id='signup'>Signup</Button>
                    </div>
                    :
                    <Logout/>
                }

            </div>
        </>
    )
}
export default Navbar