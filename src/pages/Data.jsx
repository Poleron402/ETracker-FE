import { BarChart, PieChart } from '@mui/x-charts/';
import { Paper } from '@mui/material';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { api, apiError
 } from "../utilities"

const Data =()=>{
    const [expenses, setExpenses] = useState()
    const [total, setTotal] = useState()
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
            setTotal(getTotal(transformDataByType(dataF)))
            setExpenses(transformDataByType(dataF))
        }catch (error){
            apiError(error, "Fetching expenses")
        }
    }
    const getTotal = (data) =>{
        return data.reduce((accumulator, current)=>{
            return accumulator+=current.value
        }, 0)
    }
    const transformDataByType = (data) =>{
        let reduced = Object.entries(data.reduce((accumulator, current)=>{
            const type = current.type
            if (type in accumulator){
                accumulator[type] += current.expense
            }else{

                accumulator[type] = current.expense
            }
            return accumulator
        }, {})).map(([label, value])=>({label, value}))
        return reduced
    }

    useState(()=>{
        getExpenses()
    }, [])
    return (
        <>
        <h3>Your insights</h3>
        <div id='pie-chart'>
            <Paper elevation={4}>
                {expenses &&
                    <PieChart
                    colors={[
                        "#8e94f2",
                        "#757bc8",
                        "#4e148c",
                        "#548fee",
                        "#dab6fc", 
                        "#bb4efd",
                        "#c77dff",
                        "#bb4efd"
                    ]}
                    series={[
                    {
                        data: expenses,
                        paddingAngle: 3,
                        cornerRadius: 5,
                        innerRadius: 50,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        valueFormatter: (v) => `${(v.value).toFixed(2)} - ${(100*v.value/total).toFixed(2)}%`,
                    },
                    ]}
                    
                    width={600}
                    height={250}
                />
                }
                </Paper>
            </div>
        </>
    )
}

export default Data 