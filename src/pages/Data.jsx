import MyPieChart from '../components/data/PieChart';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { api, apiError } from "../utilities"
import MyBarChart from '../components/data/LineChart';

const Data =()=>{
    const [expenses, setExpenses] = useState()
    const token = Cookies.get("token")
   
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
   

    useEffect(()=>{
        getExpenses()
    }, [])
    return (
        <div>
            {expenses &&
            <>
                <MyPieChart expenses={expenses}/>
                <MyBarChart expenses={expenses}/>
            </>
            }    
        </div>
        
    )
}

export default Data 