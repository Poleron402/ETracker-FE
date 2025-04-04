import etracker from "../assets/Etracker.png"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import Login from "./Login"
import { useSelector } from "react-redux"
import Logout from "./Logout"

const Navbar = ()=>{
    const token = Cookies.get("token")

    return (
        <>
            <div id="navbar">
                <Link to="/"><img src={etracker} id='menu_image'/></Link>
                <div id="navbar_options">
                    {token &&
                        <Link to="/track">
                            Track
                        </Link>
                    }
                    
                    <Link to="/about">
                        About
                    </Link>
                </div>
                {token == null ?
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