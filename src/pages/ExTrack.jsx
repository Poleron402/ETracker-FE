import { useState, useEffect } from "react"
import { Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material"
import { api } from "../utilities"
import Cookies from "js-cookie"
import {X, PlusIcon, BarChart, ArrowDownNarrowWide} from "lucide-react"
import AddExpense from "../components/AddExpense"
import { Types } from "../utilities"



const ExTrack = ()=>{
    const [expenses, setExpenses] = useState([])
    const [editedExpense, setEditedExpense] = useState({})
    const [editingId, setEditingId] = useState(null)
    const [types, setTypes] = useState([])
    const [openControl, setOpenControl] = useState(false)
    const [expenseAmount, setExpenseAmount] = useState()
    const [expenseType, setExpenseType] = useState("FOOD")
    const [expenseNote, setExpenseNote] = useState("")
    const [deletingExp, setDeletingExp] = useState(null)
    const [deletingDialog, setDeletingDialog] = useState(false)
    const [showStats, setShowState] = useState(false)
    const token = Cookies.get("token")

    const getTypes = async()=>{
        try{
            if (token){
                let response = await api.get("/expenses/types",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )
                console.log(response.data)
                setTypes(response.data)
            }
        }catch (err){
            alert(err)
        }
        
    }
    const getExpenses = async()=>{
        let response = await api.get("/expenses/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            }
        )
        const data = await response.data
        
        let dataF = data.sort((a, b)=>new Date(b.date)-new Date(a.date))

        // let dataM = dataF.map(exp => {
        //     const date = new Date(exp.date);
        //     return {...exp, date: date.toISOString().split('T')[0]}})

        setExpenses(dataF)
        console.log(response.data)
    }
    const handleDelete = async()=>{
        const response = await api.delete(`/expenses/${deletingExp.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })
        setDeletingExp(null)
        setDeletingDialog(false)
        getExpenses()
    }

    const addExpense = async()=>{
        let myexpense = {
            "expense": expenseAmount,
            "type": expenseType,
            "note": expenseNote
        }
        let response = await api.post("/expenses/", myexpense,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })
        getExpenses()
        setOpenControl(false)
    }
    const handleKeyDown =(e)=>{
        if (e.key  == 'Enter'){
            addExpense()
        }
    }
    const closeController = () =>{
        setExpenseAmount(null)
        setExpenseType("")
        setExpenseNote("")
        setOpenControl(false)
    }

    // Editing stufffff
    const handleDoubleClick = (id, exp) =>{
        setEditingId(id)
        setEditedExpense(exp)
    }

    const handleOnBlur = () =>{
        sentPutReqToUpdate()
        setEditingId(null)
    }
    const sentPutReqToUpdate = async()=>{
        let response= await api.put(`/expenses/${editedExpense.id}`, editedExpense, 
            {
                headers:
                {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log(response)
    }
    useEffect(()=>{
        getExpenses()
        getTypes()
    }, [token])

    return (
                <>
                
                <div id="table_main">
                <div>
                    <Button className='regularButton' variant="contained" onClick={()=>setOpenControl(true)}>Add Expense <PlusIcon/></Button>
                    <Button style={{marginInline: 10}} className='regularButton' variant="contained" onClick={()=>setOpenControl(true)}>Get Stats <BarChart/></Button>
                </div>
                {
                openControl && (
                    <AddExpense handleKeyDown={handleKeyDown} 
                    expenseAmount={expenseAmount}
                    setExpenseNote={setExpenseNote}
                    setExpenseType={setExpenseType}
                    setExpenseAmount={setExpenseAmount}
                    expenseType={expenseType}
                    expenseNote={expenseNote}
                    closeController={closeController}
                    types={types}
                    addExpense={addExpense}
                    />
                )
                }
                <br></br>
                <table>
                    <thead>
                    <tr>
                        <th> <span className="lucide-aligned"> Date &nbsp;<span className='lucide-button'><ArrowDownNarrowWide /></span></span></th>
                        <th> <span className="lucide-aligned">Expense Amount &nbsp;<span className='lucide-button'><ArrowDownNarrowWide/></span></span></th>
                        <th> Expense Type</th>
                        <th> Note</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        expenses.map((expense, id)=>(
                            <tr key = {expense.id}>
                                <td>
                                    {expense.date.split('T')[0]} 
                                </td>
                                <td>
                                    ${expense.expense.toFixed(2)}
                                </td>
                                <td onDoubleClick={()=>handleUpdate(id)}>
                                <p className="type_tag" style={{backgroundColor: Types[expense.type], 
                                    padding: 5, 
                                    borderRadius: 10,
                                    color: "white"}}>• {expense.type}</p>
                                </td>
                                <td 
                                onBlur={handleOnBlur}
                                onDoubleClick={()=>handleDoubleClick(expense.id, expense)}>
                                    {
                                        editingId === expense.id ?
                                        <input 
                                        autoFocus
                                        value = {editedExpense.note}
                                        onChange={(e)=>{
                                            setEditedExpense(prev => (
                                                {...prev, note: e.target.value}
                                            ))
                                        }}
                                        ></input>
                                        :
                                        expense.note
                                    }
                                    
                                </td>
                                <td className="table_menu">
                                    <Button onClick={()=>{
                                        setDeletingExp(expense)
                                        setDeletingDialog(true)
                                        
                                    }}><X/></Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                
                </div>
                    
                <Dialog open={deletingDialog}>
                    <DialogTitle>Confirm delete</DialogTitle>
                    <DialogContent>
                        {deletingExp &&
                        (
                            <p>Are you surre you would like to delete 
                            expense of ${deletingExp.expense} on {deletingExp.date.split('T')[0]} for {deletingExp.type}</p>
                        )
                        }
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{
                            handleDelete()
                        }}>Delete</Button>
                        <Button onClick={()=>{
                            setDeletingExp(null)
                            setDeletingDialog(false)
                        }}>Nevermind</Button>
                    </DialogActions>
                </Dialog>
        </>
    )
}

export default ExTrack