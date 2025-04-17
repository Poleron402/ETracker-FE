import { LineChart } from '@mui/x-charts/';
import { Paper, CircularProgress } from '@mui/material';
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { api, apiError} from "../../utilities"
import { AcUnit } from '@mui/icons-material';


const MyLineChart = ({expenses}) =>{
    const [dateRange, setDateRange] = useState()
    // const [sortedData, setSortedDate] = useState()
    const [allDates, setAllDates] = useState()
    const [allSums, setAllSums] = useState()
    const sortExpensesByDate = (data) =>{
        //let dataF = data.sort((a, b)=>new Date(b.date)-new Date(a.date))
        let dataSorted = data.sort((a, b)=>new Date(a.date) - new Date(b.date))
        let reduced = Object.entries(dataSorted.reduce((accumulator, current)=>{
            let date = new Date(current.date)
            date = date.toDateString()
            console.log(date)
            if (date in accumulator){
                accumulator[date] += current.expense
            }else{
                accumulator[date] = current.expense
            }
            return accumulator
        }, {}))
        setAllDates(reduced.map(([date]) => date))
        setAllSums(reduced.map(([, value]) => value))

    }
  
    const getDateRange=(numDays)=>{
        const d = new Date()
        const startDate = new Date()
        startDate.setDate(d.getDate()-numDays)
        let current = new Date(startDate)
        let dateArray = []
        while (current < d){
            let toFormat = new Date(current)
            dateArray.push(toFormat.toDateString())
            current.setDate(current.getDate() + 1)
        }
        setDateRange(dateArray)
    }
   
    useEffect(()=>{
        getDateRange(3)
        sortExpensesByDate(expenses)
    }, [])
    

    return (
        <>
            <Paper elevation={4}
                sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
                <h3 className='headerData'>My Expenses By Date</h3>
                {dateRange?
                <LineChart
                    xAxis={[{ scaleType: 'band', data: allDates }]}
                    series={[{data: allSums}]}
                    width={500}
                    height={300}
                />
                :
                    <CircularProgress/>
                }
            </Paper>
        </>
    )
}

export default MyLineChart