import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material"
import { api, apiError, handleKeyDown } from "../utilities"
import Cookies from "js-cookie"
import {X, PlusIcon, BarChart} from "lucide-react"
import AddExpense from "../components/AddExpense"
import { Types } from "../utilities"
import SaveExpenses from "../components/SaveMyExpenses"
import SortExpense from "../components/SortExpense"

const ExTrack = ()=>{
    const [expenses, setExpenses] = useState([])
    const [editedExpense, setEditedExpense] = useState({})
    const [editingField, setEditingField] = useState({id: null, field: null})
    const [types, setTypes] = useState([])
    const [openControl, setOpenControl] = useState(false)
    const [expenseAmount, setExpenseAmount] = useState()
    const [expenseType, setExpenseType] = useState("FOOD")
    const [expenseNote, setExpenseNote] = useState("")
    const [deletingExp, setDeletingExp] = useState(null)
    const [deletingDialog, setDeletingDialog] = useState(false)
    const [updateFlag, setUpdateFlag] = useState(false)
   
    const token = Cookies.get("token")
    const navigate = useNavigate()
    const getTypes = async()=>{
        try{
            let response = await api.get("/expenses/types", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            setTypes(response.data)
        }catch (err){
            apiError(err, "Fetching types")
        }
    }
    const getExpenses = async()=>{
        try{
            let response = await api.get("/expenses/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                      }
                }
            )
            const data = await response.data
            let dataF = data.sort((a, b)=>new Date(b.date)-new Date(a.date))
            setExpenses(dataF)
        }catch (error){
            apiError(error, "Fetching expenses")
        }
        
    }
    const handleDelete = async()=>{
        try{
            const response = await api.delete(`/expenses/${deletingExp.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            if (response.status === 200){
                setDeletingExp(null)
                setDeletingDialog(false)
                getExpenses()
            }
        }catch (error){
            apiError(error, "Deleting an expense")
        }
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
        if (response.status === 200){
            getExpenses()
            setOpenControl(false)
        }
    }
    
    const closeController = () =>{
        setExpenseAmount(null)
        setExpenseType("")
        setExpenseNote("")
        setOpenControl(false)
    }

    // Editing stufffff
    const handleDoubleClick = (newid, exp, newfield) =>{

        setEditingField({id: newid, field: newfield})
        setEditedExpense(exp)
    }
    const handleOnBlur = (newfield) =>{
        if (newfield === "date"){
            const newdate = new Date(`${editedExpense.date}T00:00:00`)
            const updated = {...editedExpense, date: newdate}
            sentPutReqToUpdate(updated)
        }else{
            sentPutReqToUpdate(editedExpense)
        }
        
        setEditingField({id:null, field: null})
    }
    const sentPutReqToUpdate = async(edited)=>{
        try{
            let response= await api.put(`/expenses/${editedExpense.id}`, edited, 
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (response.status === 200){
                setUpdateFlag(!updateFlag)
            }
        }catch (error){
            apiError(error, "Updating expense")
        }
    }


    useEffect(()=>{
        if (!token){
            navigate("/")
        }
        getExpenses()
        getTypes()
    }, [token, updateFlag])

    return (
        <> 
            <div id="table_main">
                <div id="options">
                    <div>
                        <Button className='regularButton' variant="contained" onClick={()=>setOpenControl(true)}>Add Expense <PlusIcon/></Button>
                        <Button style={{marginInline: 10}} className='regularButton' variant="contained" onClick={()=>navigate("/stats")}>Get Stats <BarChart/></Button>
                    </div>
                    <SaveExpenses data={expenses}/>
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
                    <SortExpense expenses={expenses} setExpenses={setExpenses}/>
                </tr>
                </thead>
                <tbody>
                {
                    expenses.map((expense)=>(
                        <tr key = {expense.id}>
                            <td 
                            onDoubleClick={()=>handleDoubleClick(expense.id, expense, "date")}>
                                    {
                                    editingField.id === expense.id && editingField.field == "date"?
                                    <input
                                    
                                    type="date"
                                    value = {editedExpense.date}
                                    onChange={(e)=>{
                                        setEditedExpense(prev => (
                                            {...prev, date: e.target.value}
                                        ))
                                    }}
                                    onBlur={()=>handleOnBlur("date")}
                                    ></input>
                                    :
                                    expense.date && expense.date.split('T')[0]
                                }
                            </td>
                            <td onDoubleClick={()=>handleDoubleClick(expense.id, expense, "expense")}>
                            {
                                    editingField.id === expense.id && editingField.field == "expense"?
                                    <>$<input
                                    autoFocus
                                    value = {editedExpense.expense}
                                    onChange={(e)=>{
                                        setEditedExpense(prev => (
                                            {...prev, expense: e.target.value}
                                        ))
                                    }}
                                    onBlur={()=>handleOnBlur("expense")}
                                    ></input>
                                    </>
                                    :
                                (<h3>${expense.expense.toFixed(2)}</h3>)
                            }       
                            </td>
                            <td onDoubleClick={()=>handleDoubleClick(expense.id, expense, "type")}>
                            {
                                editingField.id === expense.id && editingField.field == "type"?
                                <select 
                                autoFocus
                                onBlur={()=>handleOnBlur("type")}
                                name="types" id="types" value={editedExpense.type} 
                                onChange={(e)=>setEditedExpense(prev=>({...prev, type: e.target.value}))}>
                                    {
                                        types.map((type, id)=>(
                                            <option key={id} value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                                :
                                <p className="type_tag" style={{backgroundColor: Types[expense.type], 
                                    padding: 5, 
                                    borderRadius: 10,
                                    color: "white"}}>• {expense.type}
                                </p>
                            }
                            </td>
                            <td 
                            
                            onDoubleClick={()=>handleDoubleClick(expense.id, expense, "note")}>
                                {
                                    editingField.id === expense.id && editingField.field == "note" ?
                                    <input 
                                    autoFocus
                                    onBlur={()=>handleOnBlur("note")}
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