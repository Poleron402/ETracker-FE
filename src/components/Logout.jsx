import { Button, DialogActions, DialogTitle, Dialog } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"
import { useState } from "react"
import Cookies from 'js-cookie';

const Logout = () =>{
    const [openDialog, setOpenDialog] = useState(false)
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        dispatch(logout())
        Cookies.remove("token")
    }
    return (
        <>
        <Button onClick={()=>{setOpenDialog(true)}} variant="contained" style={{ padding: "8px 25px" }}>Logout</Button>
        <Dialog open={openDialog}>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogActions>
                <Button onClick={logoutHandler}>Logout</Button>
                <Button onClick={()=>setOpenDialog(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Logout