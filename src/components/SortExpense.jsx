import { Paper, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material"
import { useState, useEffect } from "react"
import {ArrowDownNarrowWide, ArrowDownWideNarrow, FilterIcon, Calendar} from "lucide-react"

const SortExpense = ({expenses, setExpenses}) =>{

    const [showFilters, setShowFilters] = useState(false)
    const [sortConfig, setSortConfig] = useState({type:"date", direction: "desc"})

    const sortExpenses = () =>{
        let sorted = [...expenses]
        if (sortConfig.type === "date"){
            sorted.sort((a, b)=>sortConfig.direction==="asc"?new Date(a.date)- new Date(b.date):new Date(b.date)- new Date(a.date))

        }else if (sortConfig.type === "amount"){
            sorted.sort((a, b)=>sortConfig.direction==="desc"?b.expense- a.expense:a.expense- b.expense)
           
        }
        setExpenses(sorted)
    }

    useEffect(()=>{
        sortExpenses()
    }, [sortConfig])
    return (
        <>
            <th> <span className="lucide-aligned"> Date &nbsp;<span className='lucide-button'>
                {sortConfig.type === "date" && sortConfig.direction==="asc" ?
                <ArrowDownWideNarrow onClick={()=>
                    setSortConfig({type:"date", direction: "desc"})}/>:
                <ArrowDownNarrowWide onClick={()=>
                    setSortConfig({type:"date", direction: "asc"})}/>}</span></span></th>
            <th>
                <div>
                <span className="lucide-aligned">Expense Amount &nbsp;
                <span className='lucide-button'>
                <FilterIcon onClick={()=>setShowFilters(!showFilters)}/></span></span>
                {showFilters&&
                    <Paper id="menu" sx={{ width: 220, maxWidth: '100%' }}>
                        <MenuList>
                            <MenuItem onClick={()=>{
                                setSortConfig({type:"amount", direction: "desc"})
                            }}>
                                <ListItemIcon>
                                    <ArrowDownWideNarrow/>
                                </ListItemIcon>
                                <ListItemText>Highest First</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                setSortConfig({type:"amount", direction: "asc"})
                            }}>
                                <ListItemIcon>
                                    <ArrowDownNarrowWide/>
                                </ListItemIcon>
                                <ListItemText>Lowest First</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={()=>{

                                setSortConfig({type:"date", direction: "desc"})
                            }}>
                                <ListItemIcon>
                                        <Calendar/>
                                    </ListItemIcon>
                                <ListItemText>Order By Date</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                }
                </div>  
            </th>          
            <th> Expense Type</th>
            <th> Note</th>
        </>
    )
}
export default SortExpense