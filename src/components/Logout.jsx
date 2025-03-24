import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"


const Logout = () =>{
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        dispatch(logout())
    }
    return (
        <>
        <Button onClick={logoutHandler} variant="contained" style={{ padding: "8px 25px" }}>Logout</Button>
        </>
    )
}

export default Logout