import etracker from "../assets/Etracker.png"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import Login from "./Login"
import { api, apiError } from "../utilities"
import Logout from "./Logout"

const Navbar = ()=>{
    const [authed, setAuthed] = useState(Cookies.get("token")||null)

    const checkTokenExpired = async()=>{
        if (authed){
            try{
                let response = await api.get("/api/auth/check",{
                    headers:{
                        Authorization: `Bearer ${authed}`
                    }
                })
            
            setAuthed(response.data.slice(7))
            }catch(err){
                if (err.response?.status === 403){
                    Cookies.remove("token")
                    setAuthed(null)
                }else{
                    apiError(err, "Checking authentication and token validity")
                }
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