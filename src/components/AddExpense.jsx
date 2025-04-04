import { Types } from "../utilities"
import { Button } from "@mui/material"
import { X } from "lucide-react"
const AddExpense = ({handleKeyDown, 
    closeController, 
    expenseAmount,
    expenseType,
    expenseNote,
    setExpenseNote,
    setExpenseType,
    setExpenseAmount,
    types,
    addExpense
}) =>{

    
    return (
        <form onKeyDown={handleKeyDown} className="form">
                <table>
                    <tr>
                        <td>
                            <label htmlFor='expense'>Expense:</label>
                        </td>
                        <td>
                            <input id='expense' type="number" 
                            placeholder="$0.00"
                            value = {expenseAmount} onChange={e=>setExpenseAmount(e.target.value)}></input>
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
                            <div className="lucide-aligned">
                                <Button variant="contained"  onClick={addExpense}>Add</Button>
                                <X onClick={closeController}/>
                            </div>
                        </td>
                        
                    </tr>
                </table>
                
            </form>
    )
}

export default AddExpense