import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { api } from "../utilities"
import {X} from "lucide-react"
const Types = {
    'FOOD': "rgb(197, 77, 50)",
    'MISC': "rgb(38, 111, 160)",
    'CLOTHING': "rgb(139, 77, 163)",
    'SERVICE': "  #437a37",
    'BILL': "rgb(216, 162, 14)",
    'ENTERTAINMENT': "  #e5b4b1",
    'PRESENT': "rgb(101, 117, 58)",
    'CAR': "rgb(109, 98, 207)"
}


const ExTrack = ()=>{
    const [expenses, setExpenses] = useState([])
    const [types, setTypes] = useState([])
    const [openControl, setOpenControl] = useState(false)

    const [expenseAmount, setExpenseAmount] = useState()
    const [expenseType, setExpenseType] = useState()
    const [expenseNote, setExpenseNote] = useState("")
    const getTypes = async()=>{
        let response = await api.get("types")
        console.log(response.data)
        setTypes(response.data)
    }
    const getExpenses = async()=>{
        let response = await api.get("/expenses/")
        const data = await response.data
        
        const dataM = data.map(exp => {
            const date = new Date(exp.date);
            return {...exp, date: date.toISOString().split('T')[0]}})
        console.log(dataM)
        setExpenses(dataM)
        console.log(response.data)
    }
    const handleDelete = async(id)=>{
        const response = await api.delete(`/expenses/${id}`)
        getExpenses()
    }
    const addExpense = async()=>{
        let myexpense = {
            "expense": expenseAmount,
            "type": expenseType,
            "note": expenseNote
        }
        let response = await api.post("/expenses/", myexpense)
        getExpenses()
        setOpenControl(false)
    }
    useEffect(()=>{
        getExpenses()
        getTypes()
    }, [])

    return (
                <>
                <div id="table_main">
                <table>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Expense Amount
                        </th>
                        <th>
                            Expense Type
                        </th>
                        <th>
                            Note
                        </th>
                    </tr>
                    {
                        
                        expenses.map((expense, id)=>(
                            <tr>
                                <td>
                                    {expense.date}  
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
                                <td>
                                    {expense.note}
                                </td>
                                <td className="table_menu">
                                    <Button onClick={()=>handleDelete(expense.id)}><X/></Button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
                <div>
                <Button className='regularButton' variant="contained" onClick={()=>setOpenControl(true)}>Add Expense</Button>
                <Button className='regularButton' variant="contained" onClick={()=>setOpenControl(true)}>Get Stats</Button>
                </div>
                </div>
                    
        {
            openControl && (
            <div className="form">
                <table>
                    <tr>
                        <td>
                            <label htmlFor='expense'>Expense:</label>
                        </td>
                        <td>
                            <input id='expense' value = {expenseAmount} onChange={e=>setExpenseAmount(e.target.value)}></input>
                        </td>
                        <td>
                            <label htmlFor='types'>Expense Type:</label>
                        </td>
                        <td>
                        <select name="types" id="types" value={expenseType} onChange={e=>setExpenseType(e.target.value)}>
                            {
                                types.map((type, id)=>(
                                    <option value={type}>{type}</option>
                                ))
                            }
                        </select>
                        </td>
                        <td>
                            Note:
                        </td>
                        <td>
                            <input type="text" value={expenseNote} onChange={e=>setExpenseNote(e.target.value)}></input>
                        </td>
                        <td>
                            <Button variant="contained" onClick={addExpense}>Add</Button>
                        </td>
                    </tr>
                </table>
                
            </div>
            )
        }
        </>
    )
}

export default ExTrack