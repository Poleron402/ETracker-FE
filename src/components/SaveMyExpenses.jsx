import { Download } from "lucide-react"
import { MenuList, MenuItem, Paper } from "@mui/material"
import { FileSpreadsheet, FileJson } from "lucide-react"
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from "react";
import * as XLSX from "xlsx"

const SaveExpenses = ({data}) =>{

    const [showMenu, setShowMenu] = useState(false)


    const saveAs=(what)=>{
        if (what === 'xlsx'){
            let myData = data.map(obj=> {
                delete obj.id
                return obj})
            const ws = XLSX.utils.json_to_sheet(myData)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
            XLSX.writeFile(wb, "expenses.xlsx");
        }else{
            const fileJSONed = `const expenses = ${JSON.stringify(data, null, 2)}`
            const blob = new Blob([fileJSONed], {type: "text/javascript"})
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "expenses.json";   
            document.body.appendChild(a);   
            a.click();
            document.body.removeChild(a);   

            URL.revokeObjectURL(url);
        }
    }
    return (
        <>
        <div>
            <Download id="downloadButton" onClick = {()=>setShowMenu(!showMenu)} />
            {showMenu &&
                <Paper id="menu" sx={{ width: 220, maxWidth: '100%' }}>
                    <MenuList >
                        <MenuItem onClick={()=>saveAs("xlsx")}>
                        <ListItemIcon>
                            <FileSpreadsheet/>
                        </ListItemIcon>
                        <ListItemText>
                            Save as .xlxs
                        </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={()=>saveAs("json")}>
                        <ListItemIcon>
                            <FileJson/>
                        </ListItemIcon>
                        <ListItemText>
                            Save as .json
                        </ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            }

            </div>
        </>
    )

}

export default SaveExpenses