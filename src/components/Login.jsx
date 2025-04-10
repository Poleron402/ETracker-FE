import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button} from "@mui/material";
import { useState } from "react";
import { api } from "../utilities"
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [dialogOpen, setDialogOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginHandler = async() =>{
        let data = {
            email: username,
            password: password
        }
        try{
            let response = await api.post("/login", data)
            if (response.status === 200){
                const data = response.data
                console.log(data.token)
                Cookies.set("token", data.token, {expires: 7})
                dispatch(setCredentials({user: data.username, token: data.token}))
                setDialogOpen(false)
                navigate("/track")
                window.location.reload()
                
            }
        }catch(err){
            alert(err)
        }
       
        
    }
    const handleKeyDown = (e) =>{
        if (e.key == 'Enter'){
            loginHandler()
        }
    }
    return(
        <>
            <Button id='login' onClick={()=>{
                setDialogOpen(true)
            }}>Login</Button>
            <Dialog open={dialogOpen}
            onKeyDown={handleKeyDown}
            slotProps={{
                backdrop:{
                style: {
                  backgroundColor: "rgba(23, 32, 82, 0.2)", // Slight dark overlay
                  backdropFilter: "blur(15px)", // Blur effect
                },}
              }}>
                <DialogTitle>
                    Welcome aboard!
                </DialogTitle>
                <DialogContent>
                    <TextField style={{marginTop: 5}} variant="outlined" label="Email" value={username} onChange={(e)=>setUsername(e.target.value)}>
                    </TextField>
                    <br></br>
                    <TextField type="password" style={{marginTop: 15}} variant="outlined" label="Password" value={password} onChange={e=>setPassword(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        loginHandler()
                    }}>Login</Button>
                    <Button onClick={()=>{
                        setDialogOpen(false)
                    }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Login