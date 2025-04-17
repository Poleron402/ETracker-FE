import { Button, DialogActions, DialogTitle, Dialog } from "@mui/material"
import { useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Logout = () =>{
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        navigate("/")
        window.location.reload()
        Cookies.remove("token")
        setOpenDialog(false)
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